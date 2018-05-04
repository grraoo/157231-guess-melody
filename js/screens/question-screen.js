import AbstractView from "./abstract-view";
import header from "./header";
import timerTemplate from "./timer-view";
import App from "../logic/app";
import game from "../logic/game";
import Timer from "../logic/timer";
import ResultScreen from "./screen-result";
import initPlayerControl from "../logic/player-control";

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

    const answer = {success: this.question.isRightAnswer(), time: game.answerTime};
    App.doAnswer(answer);
  }

  bindTimer() {
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

    if (!game.timer) {
      const timeEnd = () => {
        const resultScreen = new ResultScreen().element;
        App.showScreen(resultScreen);
        game.timer.pause();
      };
      game.timer = new Timer(game, printTime, timeEnd);
      document.addEventListener(`click`, initPlayerControl);
    }

    printTime();
  }
}

export default QuestionScreen;
