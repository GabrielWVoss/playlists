$(document).ready(function () {
  $.getJSON("https://raw.githubusercontent.com/GabrielWVoss/playlists/main/Carlo%20Bellucci/nilo.json", function (json) {
    var playing = false;
    var playlist;

    var shuffleOne = false;
    var repeatOne = false;

    let index = 0;
    playlist = json;

    var currentTime = 0;
    var progress = 160;

    function setPlaylist() {
      $(artistOne).text(playlist[index].artist);
      $(titleOne).text(playlist[index].title);

      $(lineOne).text(playlist[index].lineOne);
      $(lineTwo).text(playlist[index].lineTwo);
      $(lineThree).text(playlist[index].lineThree);
      $(coverOne).css({
        "background-image": `url(${playlist[index].cover})`,
      });
      document
        .getElementById("playerOne")
        .setAttribute("src", playlist[index].src);

      currentTime = document.getElementById("playerOne");
      $(currentTimeOne).text(
        currentTime.currentTime ? currentTime.currentTime : "00:00"
      );
      $(durationOne).text(
        currentTime.duration ? currentTime.duration : "00:00"
      );

      progress = 160 - (currentTime.currentTime / currentTime.duration) * 130;
    }

    setPlaylist();

    time_update_interval();

    function time_update_interval() {
      time_update = setInterval(function () {
        progress = 160 - (currentTime.currentTime / currentTime.duration) * 130;
        $("#timeTrackerOne").css({
          background: `linear-gradient(${progress}deg, #333E2E 50%, #1f1f1f 50%)`,
        });
        $(currentTimeOne).text(formatTime(currentTime.currentTime));
        $(durationOne).text(formatTime(currentTime.duration));

        if (currentTime.currentTime === currentTime.duration) {
          if (repeatOne) {
            document.getElementById("playerOne").play();
          } else if (shuffleOne) {
            shufleOn();
          } else if (index < playlist.length - 1) {
            index = index + 1;
            setPlaylist();
            document.getElementById("playerOne").play();
            $("#playOne").addClass("pausePlay");
          } else $("#playOne").removeClass("pausePlay");
        }
      }, 1000);
    }

    function formatTime(time) {
      time = Math.round(time);

      var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

      seconds = seconds < 10 ? "0" + seconds : seconds;

      return minutes + ":" + seconds;
    }

    function shufleOn() {
      var shufling = Math.floor(Math.random() * (playlist.length - 1 + 1));

      while (shufling === index) {
        shufling = Math.floor(Math.random() * (playlist.length - 1 + 1));
      }

      index = shufling;
      setPlaylist();

      if (index < playlist.length - 1) $("#nextOne").removeClass("fadePlay");
      if (index > 0) {
        $("#previousOne").removeClass("fadePlay");
      }

      if (index === 0) $("#previousOne").addClass("fadePlay");
      if (index === playlist.length - 1) $("#nextOne").addClass("fadePlay");

      document.getElementById("playerOne").play();
    }

    $("#playOne").click(function () {
      if (!playing) {
        $(this).addClass("pausePlay");
        document.getElementById("playerOne").play();
        playing = true;
      } else {
        $(this).removeClass("pausePlay");
        document.getElementById("playerOne").pause();
        playing = false;
      }
    });

    $("#previousOne").click(function () {
      if (shuffleOne) {
        shufleOn();
      } else if (index > 0) {
        index = index - 1;
        setPlaylist();
        document.getElementById("playerOne").play();
        $("#playOne").addClass("pausePlay");
        if (index > 0) $(this).removeClass("fadePlay");
        else $(this).addClass("fadePlay");
        if (index < playlist.length - 1) $("#nextOne").removeClass("fadePlay");
      }
    });

    $("#nextOne").click(function () {
      if (shuffleOne) {
        shufleOn();
      } else if (index < playlist.length - 1) {
        index = index + 1;
        setPlaylist();
        document.getElementById("playerOne").play();
        $("#playOne").addClass("pausePlay");
        if (index < playlist.length - 1) $(this).removeClass("fadePlay");
        else $(this).addClass("fadePlay");
        if (index > 0) $("#previousOne").removeClass("fadePlay");
      }
    });

    $("#shuffleOne").click(function () {
      if (!shuffleOne) {
        $(this).addClass("bottonOn");
        shuffleOne = true;
      } else {
        $(this).removeClass("bottonOn");
        shuffleOne = false;
      }
    });

    $("#repeatOne").click(function () {
      if (!repeatOne) {
        $(this).addClass("bottonOn");
        repeatOne = true;
      } else {
        $(this).removeClass("bottonOn");
        repeatOne = false;
      }
    });
  });
});
