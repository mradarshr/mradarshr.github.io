const plyrurl = "https://plyrv.pages.dev/#";

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
  popupCard.style.padding = '20px';
  popupCard.style.borderRadius = '10px';
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
  closeButton.style.fontSize = '24px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = '#333';
  closeButton.onclick = () => document.body.removeChild(overlay);

  overlay.onclick = (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  };

  const heading = document.createElement('h2');
  heading.innerText = 'Choose Quality';

  const createButton = (text, quality) => {
    const stream_url = `${plyrurl}${encodeURIComponent(
      `https://liveclasses.cloud-front.in/live/${recordingSchedule}.m3u8?starttime_epoch=${strtotime}${quality}`
    )}`;
    const button = document.createElement('a');
    button.href = stream_url;
    button.innerText = text;
    button.className = 'quality-btn';
    return button;
  };

  const highQuality = createButton('High Quality', '');
  const mediumQuality = createButton(
    'Medium Quality',
    '&endtime_epoch=1927156522&mode=4&txCodecTempName=360p&timeshift=1'
  );
  const lowQuality = createButton(
    'Low Quality',
    '&endtime_epoch=1927156522&mode=4&txCodecTempName=240p&timeshift=1'
  );

  popupCard.appendChild(closeButton);
  popupCard.appendChild(heading);
  popupCard.appendChild(highQuality);
  popupCard.appendChild(mediumQuality);
  popupCard.appendChild(lowQuality);
  overlay.appendChild(popupCard);
  document.body.appendChild(overlay);
}
