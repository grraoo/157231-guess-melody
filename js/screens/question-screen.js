import AbstractView from "./AbstractView";
import header from "./header";
import timerTemplate from "./timerTemplate";
import App from "../logic/app";
import game from "../logic/game";
import Timer from "../logic/timer";
import ResultScreen from "./screen-result";

class QuestionScreen extends AbstractView {
  constructor(question) {
    if (new.target === QuestionScreen) {
      throw new Error(`Can't create Abstract QuestionScreen, need concrete one!`);
    }
    super();
    this.question = question;
  }
  header() {
    return `${timerTemplate(game)}\n\t${header(game)}`;
  }
  doCurrentAnswer(eventTarget) {

    const answers = eventTarget.querySelectorAll(`input:checked`);
    this.question.answer = new Set([...this.question.melodies].filter(this.collectAnswer(answers)));
    const answer = {success: true, time: game.answerTime};
    // const answer = {success: this.question.isRightAnswer(), time: game.answerTime};
    App.doAnswer(answer);
  }

  bindTimer() {
    const enablePlayerCtrl = () => {

      let nowPlaying = null;
      document.addEventListener(`click`, (evt) => {
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
            setInterval(() => {
              status.style.width = `${((audio.currentTime / audio.duration) * 100).toFixed(2)}%`;
            }, 100);
          };
          if (btn.classList.contains(`player-control--pause`)) {
            if (nowPlaying) {
              nowPlaying.pause();
              let playingBtn = document.querySelector(`.player-control--play`);
              if (playingBtn) {
                playingBtn.classList.remove(`player-control--play`);
                playingBtn.classList.add(`player-control--pause`);
              }
            }
            audio.play();
            nowPlaying = audio;
            btn.classList.remove(`player-control--pause`);
            btn.classList.add(`player-control--play`);
          } else if (btn.classList.contains(`player-control--play`)) {
            audio.pause();
            btn.classList.remove(`player-control--play`);
            btn.classList.add(`player-control--pause`);
          }

        }
      });
    };

    const printTime = () => {
      const timerValue = document.querySelector(`.timer-value`);
      const mins = Math.floor(game.time / 60);
      const secs = game.time % 60;
      if (timerValue) {
        timerValue.innerHTML = `<span class="timer-value-mins">${mins < 10 ? `0${mins}` : mins}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${secs < 10 ? `0${secs}` : secs}</span>`;
      }
    };

    const timeEnd = () => {
      const resultScreen = new ResultScreen().element;
      App.showScreen(resultScreen);
      game.timer.pause();
    };
    if (!game.timer) {
      game.timer = new Timer(game, printTime, timeEnd);
      enablePlayerCtrl();
    }

    printTime();
    game.timer.start();
  }
}

export default QuestionScreen;
