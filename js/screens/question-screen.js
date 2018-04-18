import AbstractView from "./AbstractView";
import header from "./header";
import timer from "./timer";
import doAnswer from "../logic/doAnswer";
import rnd from "../utils/rnd";

class QuestionScreen extends AbstractView {
  constructor(question) {
    if (new.target === QuestionScreen) {
      throw new Error(`Can't create Abstract QuestionScreen, need concrete one!`);
    }
    super();
    this.question = question;
  }
  header() {
    return `${timer()}\n\t${header()}`;
  }
  doCurrentAnswer(eventTarget) {
    const answers = eventTarget.querySelectorAll(`input:checked`);

    this.question.answer = new Set([...this.question.melodies].filter((song) => {
      return [...answers].some((answer) => song.name === answer.value);
    }));
    const answer = {success: this.question.isRightAnswer(), time: rnd.getInteger(45)};
    doAnswer(answer);
  }
}

export default QuestionScreen;
