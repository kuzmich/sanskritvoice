function showAccords() {
    document.getElementById('hide-accords-style').remove();
}

function hideAccords() {
    document.head.insertAdjacentHTML(
      'beforeend',
      '<style id="hide-accords-style">.accord {display: none;}</style>'
    );
}

function savePrefs() {
    var showAccs = document.getElementById('toggle-accords').checked ? '1' : '0';
    localStorage.setItem('showAccords', showAccs);
}

function loadPrefs() {
    var showAccs = localStorage.getItem('showAccords') === '1';
    if (showAccs)
        showAccords();
    document.getElementById('toggle-accords').checked = showAccs;
}

function toggleAccordsHandler(event) {
  if (this.checked) {
    showAccords();
  } else {
    hideAccords();
  }
  savePrefs();
}

function audioLinkHandler(event) {
  event.preventDefault();

  let player = document.getElementById('player');

  // показать и включить плеер
  player.classList.remove('hidden');
  player.src = this.dataset.audioDownloadUrl;
  player.play();
}


document.addEventListener('DOMContentLoaded', (event) => {
  loadPrefs();

  // обработчик галочки "показать/скрыть аккорды"
  document.getElementById('toggle-accords').onclick = toggleAccordsHandler;

  // обработчик ссылок на аудио файл
  for (let audioLink of document.querySelectorAll('a.audio-link')) {
    audioLink.onclick = audioLinkHandler;
  }
});
