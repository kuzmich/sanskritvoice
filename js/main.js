$(document).ready(function() {
    // показать/скрыть аккорды
    $('#toggle-accords').on('click', function (event) {
        $('.accord').toggleClass('hidden', !this.checked);
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
