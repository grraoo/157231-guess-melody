import AbstractView from "./AbstractView";
import header from "./header";
import TimerView from "./timer";
import App from "../logic/app";
import game from "../logic/game";
import Timer from "../logic/timer";

class QuestionScreen extends AbstractView {
  constructor(question) {
    if (new.target === QuestionScreen) {
      throw new Error(`Can't create Abstract QuestionScreen, need concrete one!`);
    }
    super();
    this.question = question;
  }
  header() {
    return `${new TimerView(game).template}\n\t${header()}`;
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

  bindTimer(element) {

    const timerValue = element.querySelector(`.timer-value`);

    const printTime = () => {
      const mins = Math.floor(game.time / 60);
      const secs = game.time % 60;

      timerValue.innerHTML = `<span class="timer-value-mins">${mins < 10 ? `0${mins}` : mins}</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">${secs < 10 ? `0${secs}` : secs}</span>
    `;
    };
    if (!(game.timer instanceof Timer)) {
      game.timer = new Timer(game.time, printTime);
    }
    printTime();
    game.timer.start();
  }
}

export default QuestionScreen;
