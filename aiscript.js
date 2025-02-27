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
      
      // Store conversation history
      const conversationHistory = [{
        role: "system",
        content: "You are a helpful assistant powered by Llama 3."
      }];
      
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
            
            // Initial messages will come from our first API call
            // Show typing indicator
            typingIndicator.style.display = 'block';
            
            // Make initial API call
            fetch('/api/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ messages: conversationHistory }),
            })
            .then(response => response.json())
            .then(data => {
              typingIndicator.style.display = 'none';
              
              // Handle the nested response structure
              if (data.response && data.response.response) {
                addMessage(data.response.response, 'ai');
              } else if (data.error) {
                addMessage(`Error: ${data.error}`, 'ai');
              } else {
                addMessage("Hello! I'm an AI assistant powered by Llama 3. How can I help you today?", 'ai');
              }
            })
            .catch(error => {
              typingIndicator.style.display = 'none';
              addMessage("Hello! I'm an AI assistant powered by Llama 3. How can I help you today?", 'ai');
              console.error('Error making initial request:', error);
            });
            
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
    statsDiv.textContent = `Tokens: ${usage.total_tokens} (${usage.prompt_tokens} prompt, ${usage.completion_tokens} completion)`;
    messageDiv.appendChild(statsDiv);
  }
  
  chatContainer.insertBefore(messageDiv, typingIndicator);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  
  // Add to conversation history
  conversationHistory.push({
    role: sender === 'user' ? 'user' : 'assistant',
    content: content
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
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
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
          } else if (data.response && data.response.response) {
            // Handle the nested response structure
            addMessage(data.response.response, 'ai', data.response.usage);
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
