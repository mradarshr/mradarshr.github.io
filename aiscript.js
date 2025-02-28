document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const preloader = document.getElementById('preloader');
  const welcomeScreen = document.getElementById('welcome-screen');
  const chatInterface = document.getElementById('chat-interface');
  const transitionCircle = document.getElementById('transition-circle');
  const startChatButton = document.getElementById('start-chat-button');
  const chatContainer = document.getElementById('chat-container');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const typingIndicator = document.getElementById('typing-indicator');

  // Clipboard Copy Functionality
  chatContainer.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('message')) {
      const rect = target.getBoundingClientRect();
      const isUserMessage = target.classList.contains('user-message');
      const isAiMessage = target.classList.contains('ai-message');

      // Check if click is in the clipboard icon area
      if (
        (isUserMessage && e.clientX < rect.left) ||
        (isAiMessage && e.clientX > rect.right)
      ) {
        const textToCopy = target.textContent.trim();
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            // Show a temporary "Copied!" tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Copied!';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0,0,0,0.7)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1000';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s ease';

            // Position the tooltip
            if (isUserMessage) {
              tooltip.style.left = rect.left - 70 + 'px';
            } else {
              tooltip.style.left = rect.right + 10 + 'px';
            }
            tooltip.style.top = rect.top + rect.height / 2 - 10 + 'px';

            // Add to DOM and animate
            document.body.appendChild(tooltip);
            setTimeout(() => {
              tooltip.style.opacity = '1';
            }, 10);

            // Remove after 1.5 seconds
            setTimeout(() => {
              tooltip.style.opacity = '0';
              setTimeout(() => {
                document.body.removeChild(tooltip);
              }, 300);
            }, 1500);
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err);
          });
      }
    }
  });

  // Change cursor to pointer when hovering near the edges of messages
  chatContainer.addEventListener('mousemove', function (e) {
    const messages = document.querySelectorAll('.message');
    messages.forEach((message) => {
      const rect = message.getBoundingClientRect();
      const isUserMessage = message.classList.contains('user-message');
      const isAiMessage = message.classList.contains('ai-message');

      // Check if mouse is in the clipboard icon area
      if (
        (isUserMessage && e.clientX < rect.left && e.clientX > rect.left - 30 && e.clientY > rect.top && e.clientY < rect.bottom) ||
        (isAiMessage && e.clientX > rect.right && e.clientX < rect.right + 30 && e.clientY > rect.top && e.clientY < rect.bottom)
      ) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = '';
      }
    });
  });

  // Store conversation history
  const conversationHistory = [];

  // Hide preloader after content loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 800);
  });

  // Start chat button click
  startChatButton.addEventListener('click', () => {
    // Create circle transition
    transitionCircle.style.animation = 'circleTransition 0.8s forwards';
    transitionCircle.style.opacity = '1';

    // Fade out welcome screen
    welcomeScreen.style.animation = 'fadeOut 0.5s forwards';

    // After transition completes
    setTimeout(() => {
      welcomeScreen.style.display = 'none';
      chatInterface.style.display = 'flex';

      // Fade in chat interface
      setTimeout(() => {
        chatInterface.style.opacity = '1';

        // Default message - Add to UI but not to conversation history
        const defaultMessage = "Hi! Welcome to VED's AI. It's nice to meet you. Is there something I can help you with, or would you like to chat?";

        // Create and add the default AI message to UI only
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'ai-message');
        messageDiv.innerHTML = defaultMessage;

        // Add token usage stats
        const statsDiv = document.createElement('div');
        statsDiv.classList.add('stats-display');
        statsDiv.textContent = "VED's AI";
        messageDiv.appendChild(statsDiv);

        chatContainer.insertBefore(messageDiv, typingIndicator);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Reset transition circle
        transitionCircle.style.animation = '';
        transitionCircle.style.opacity = '0';

        // Focus input
        messageInput.focus();
      }, 100);
    }, 800);
  });

  // Function to add a message to the chat
  function addMessage(content, sender, usage = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');

    // Ensure content is a string
    if (typeof content !== 'string') {
      content = JSON.stringify(content); // Convert non-string content to a string
    }

    // Process markdown-like syntax for code
    if (sender === 'ai') {
      content = processCodeBlocks(content);
    }

    messageDiv.innerHTML = content;

    // Add token usage stats if available
    if (usage && sender === 'ai') {
      const statsDiv = document.createElement('div');
      statsDiv.classList.add('stats-display');
      statsDiv.textContent = "VED's AI";
      messageDiv.appendChild(statsDiv);
    }

    chatContainer.insertBefore(messageDiv, typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Add to conversation history
    conversationHistory.push({
      role: sender === 'user' ? 'user' : 'assistant',
      content: content,
    });
  }

  // Process code blocks in the AI's response
  function processCodeBlocks(text) {
    // Ensure text is a string
    if (typeof text !== 'string') {
      return text; // Return as-is if not a string
    }

    // Check for code blocks with ```
    const codeBlockRegex = /```(?:(\w+)\n)?([\s\S]*?)```/g;
    return text.replace(codeBlockRegex, (match, language, code) => {
      language = language || '';
      return `<pre><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`;
    });
  }

  // Escape HTML special characters
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Function to send message to the AI
  async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Clear input
    messageInput.value = '';

    // Add user message to chat
    addMessage(message, 'user');

    // Disable input while waiting for response
    messageInput.disabled = true;
    sendButton.disabled = true;
    typingIndicator.style.display = 'block';

    try {
      // Create messages array from conversation history
      const messages = conversationHistory.slice();

      // Send request to our API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();

      if (data.error) {
        addMessage(`Error: ${data.error}`, 'ai');
      } else if (data.response && data.response. && data.response.response.) {
        // Extract the nested response.response.response
        const aiResponse = data.response;
        const usage = 'VED Ai';
        addMessage(aiResponse, 'ai', usage);
      } else {
        addMessage("I'm sorry, I couldn't process your request. Please try again.", 'ai');
      }
    } catch (error) {
      addMessage(`Sorry, something went wrong. Please try again later.`, 'ai');
      console.error('Error:', error);
    } finally {
      // Re-enable input
      messageInput.disabled = false;
      sendButton.disabled = false;
      typingIndicator.style.display = 'none';
      messageInput.focus();
    }
  }

  // Event listeners
  sendButton.addEventListener('click', sendMessage);

  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});
