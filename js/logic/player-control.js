import game from "./game";
export default () => {
  const playPromise = (media) => media.play();
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
    game.timer.pause();
    if (currentBtn) {
      currentBtn.classList.remove(`player-control--pause`);
      currentBtn.classList.add(`player-control--play`);
    }
    nowPlaying = null;
  };
  const playerControl = (evt) => {
    const players = new Set(document.querySelectorAll(`.player-control`));
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
      if (btn.classList.contains(`player-control--play`)) {
        if (nowPlaying) {
          const playingBtn = document.querySelector(`.player-control--pause`);
          stopAudio(playingBtn, nowPlaying);
        }
        nowPlaying = audio;
        game.timer.pause();
        const playplay = playPromise(audio);
        document.querySelector(`.main-wrap`).style = `pointer-events: none; opacity: 0.5`;
        if (typeof playplay !== `undefined`) {
          playplay.then(() => {
            document.querySelector(`.main-wrap`).style = ``;
            btn.classList.remove(`player-control--play`);
            btn.classList.add(`player-control--pause`);
            game.timer.start();
            audio.play();
          }).catch(() => {
            document.querySelector(`.main-wrap`).style = ``;
            btn.classList.remove(`player-control--pause`);
            btn.classList.add(`player-control--play`);
            game.timer.pause();
            audio.pause();
          });
        }
      } else if (btn.classList.contains(`player-control--pause`)) {
        stopAudio(btn, audio);
      }
    }
  };

  document.addEventListener(`click`, playerControl);

};
