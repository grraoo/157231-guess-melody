import game from "./game";
export default () => {
  if (!game.controlsIsOn) {
    let statusProgress = null;
    let nowPlaying = null;
    const getStatus = (audio, status) => {
      statusProgress = setInterval(() => {
        status.style.width = `${((audio.currentTime / audio.duration) * 100).toFixed(2)}%`;
      }, 100);
    };
    const stopAudio = (currentBtn, audio) => {
      clearInterval(statusProgress);
      audio.pause();
      if (currentBtn) {
        currentBtn.classList.remove(`player-control--play`);
        currentBtn.classList.add(`player-control--pause`);
      }
      nowPlaying = null;
    };
    const playerControl = (evt) => {
      let players = new Set(document.querySelectorAll(`.player-control`));
      if (players.has(evt.target)) {
        evt.preventDefault();
        const btn = evt.target;
        const audio = document.querySelector(`audio[src="${btn.dataset.audio}"]`);

        const status = document.querySelector(`.player-status[data-audio="${btn.dataset.audio}"]`);
        status.style.display = `block`;
        status.style.height = `5px`;
        status.style.backgroundColor = `red`;
        status.style.width = status.style.width || `0`;

        audio.onplaying = () => {
          getStatus(audio, status);
        };
        if (btn.classList.contains(`player-control--pause`)) {
          if (nowPlaying) {
            let playingBtn = document.querySelector(`.player-control--play`);
            stopAudio(playingBtn, nowPlaying);
          }
          nowPlaying = audio;
          audio.play();
          btn.classList.remove(`player-control--pause`);
          btn.classList.add(`player-control--play`);
        } else if (btn.classList.contains(`player-control--play`)) {
          stopAudio(btn, audio);
        }
      }
    };

    document.addEventListener(`click`, playerControl);
    game.controlsIsOn = true;
  }
};
