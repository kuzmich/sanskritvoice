$(document).ready(function() {
    $('#toggle-accords').on('click', function(event){
        event.preventDefault();
        $('.accord').toggleClass('hidden');

        var a = $(this);
        if (a.text().slice(0, 6) == 'скрыть')
            a.text('показать аккорды')
        else
            a.text('скрыть аккорды');
    });

    $('a.audio-link').on('click', function(event) {
      event.preventDefault();

      var player = document.getElementById('player');
      var a = $(this);

      player.src = a.data('audioDownloadUrl');
      player.play();
    });
});
