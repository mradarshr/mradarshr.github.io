const plyrurl = "https://plyrv.pages.dev/#";

function goBack() {
          window.history.back();
        }

function openUrl(url) {
    if (typeof url === 'string' && url.trim() !== '') {
        window.location.href = url;
    } else {
        console.error('Invalid URL');
    }
}

function openPopup(recordingSchedule, strtotime) {
  const overlay = document.createElement('div');
  overlay.id = 'popup-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '1000';

  const popupCard = document.createElement('div');
  popupCard.style.backgroundColor = 'white';
  popupCard.style.padding = '50px';
  popupCard.style.borderRadius = '10px';
  popupCard.style.display = 'block';
  popupCard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  popupCard.style.textAlign = 'center';
  popupCard.style.maxWidth = '90%';
  popupCard.style.overflow = 'auto';
  popupCard.style.position = 'relative';

  const closeButton = document.createElement('button');
  closeButton.innerText = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '45px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = '#333';
  closeButton.onclick = () => document.body.removeChild(overlay);

  overlay.onclick = (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  };

  const heading = document.createElement('h2');
  heading.innerText = 'Choose Quality';

  const createButton = (text, quality) => {
    const stream_url = `https://plyrv.pages.dev/#https://livestream-pull.cloud-front.in/live-hls/${recordingSchedule}_${quality}.m3u8?start=${strtotime}&end=1927156522&mode=2`;
    const button = document.createElement('a');
    button.innerText = text;
    button.className = 'quality-btn';
    button.onclick = () => {
      openUrl(stream_url);
      document.body.removeChild(overlay);
    };
    return button;
  };

  const highQuality = createButton('High Quality', '');
  const mediumQuality = createButton(
    'Medium Quality',
    'sd'
  );
  const lowQuality = createButton(
    'Low Quality',
    'ld'
  );

  popupCard.appendChild(closeButton);
  popupCard.appendChild(heading);
  popupCard.appendChild(highQuality);
  popupCard.appendChild(mediumQuality);
  popupCard.appendChild(lowQuality);
  overlay.appendChild(popupCard);
  document.body.appendChild(overlay);
}

function openStream(url) {
  // Create the overlay
  const overlay = document.createElement('div');
  overlay.id = 'stream-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '1000';

  overlay.innerHTML = `
    <div class="overlay-header" style="background: #000; color: white; width: 100%; padding: 10px; text-align: right; position: sticky; top: 0; z-index: 100;">
      <svg class="close-btn" onclick="closeStream()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; cursor: pointer;">
        <path d="M18 6L6 18M6 6l12 12"></path>
      </svg>
    </div>
    <iframe src="${url}" style="width: 100%; height: 100%; border: none; flex-grow: 1;" allowfullscreen></iframe>
  `;
  document.body.appendChild(overlay);

  // Show the overlay
  overlay.style.display = 'flex';
}

function closeStream() {
  const overlay = document.getElementById('stream-overlay');
  if (overlay) {
    overlay.remove();
  }
}