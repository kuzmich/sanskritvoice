function showAccords() {
    $('#hide-accords-style').remove();
}

function hideAccords() {
    $('head').append(
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

$(document).ready(function() {
    loadPrefs();

    // показать/скрыть аккорды
    $('#toggle-accords').on('click', function (event) {
        if (this.checked) {
          showAccords();
        } else {
          hideAccords();
        }
        savePrefs();
    });

    // показать и включить плеер
    $('a.audio-link').on('click', function(event) {
      event.preventDefault();

      var player = document.getElementById('player');
      var audioLink = $(this);

      $(player).removeClass('hidden');

      player.src = audioLink.data('audioDownloadUrl');
      player.play();
    });
});
