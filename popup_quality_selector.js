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

  const closeButton = document.createElement('button');
  closeButton.innerText = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '24px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = 'white';
  closeButton.onclick = () => document.body.removeChild(overlay);

  overlay.onclick = (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  };

  const heading = document.createElement('h2');
  heading.innerText = 'Choose Quality';

  const highQuality = document.createElement('a');
  highQuality.href = `https://liveclasses.cloud-front.in/live/${recordingSchedule}.m3u8?starttime_epoch=${strtotime}`;
  highQuality.innerText = 'High Quality';
  highQuality.className = 'watch-btn';
  highQuality.style.display = 'block';
  highQuality.style.margin = '10px 0';

  const mediumQuality = document.createElement('a');
  mediumQuality.href = `https://liveclasses.cloud-front.in/live/${recordingSchedule}.m3u8?starttime_epoch=${strtotime}&endtime_epoch=1927156522&mode=4&txCodecTempName=360p&timeshift=1`;
  mediumQuality.innerText = 'Medium Quality';
  mediumQuality.className = 'watch-btn';
  mediumQuality.style.display = 'block';
  mediumQuality.style.margin = '10px 0';

  const lowQuality = document.createElement('a');
  lowQuality.href = `https://liveclasses.cloud-front.in/live/${recordingSchedule}.m3u8?starttime_epoch=${strtotime}&endtime_epoch=1927156522&mode=4&txCodecTempName=240p&timeshift=1`;
  lowQuality.innerText = 'Low Quality';
  lowQuality.className = 'watch-btn';
  lowQuality.style.display = 'block';
  lowQuality.style.margin = '10px 0';

  popupCard.appendChild(heading);
  popupCard.appendChild(highQuality);
  popupCard.appendChild(mediumQuality);
  popupCard.appendChild(lowQuality);
  overlay.appendChild(popupCard);
  overlay.appendChild(closeButton);
  document.body.appendChild(overlay);
}
