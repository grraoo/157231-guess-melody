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
    return `${timerTemplate()}\n\t${header()}`;
  }
  doCurrentAnswer(eventTarget) {
    const answers = eventTarget.querySelectorAll(`input:checked`);

    this.question.answer = new Set([...this.question.melodies].filter((song) => {
      return [...answers].some((answer) => song.name === answer.value);
    }));
    const answer = {success: true, time: game.answerTime};
    // const answer = {success: this.question.isRightAnswer(), time: rnd.getInteger(45)};
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

    const timeEnd = () => {
      const resultScreen = new ResultScreen().element;
      this.showScreen(resultScreen);
    };
    if (!game.timer) {
      game.timer = new Timer(game, printTime, timeEnd);
    }

    printTime();
    game.timer.start();
  }
}

export default QuestionScreen;
