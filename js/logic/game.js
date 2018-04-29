import QuestionData from "../data/question";
import load from "../data/load";

const initialState = {
  notes: 3,
  time: 300
};
const initialResults = [0, 10, 20, 12, 16, 14, 15, 7, 5];

class GameState {
  constructor(state, results) {
    this.initialState = state;
    this.results = results;
    this.init();

    this.TYPES = {
      AUTHOR: `artist`,
      GENRE: `genre`
    };
  }

  init() {
    this.answers = [];
    this.notes = this.initialState.notes;
    this.time = this.initialState.time;
    this.timer = null;
    if (!this._questions) {
      load.then((response) => response.json()).then((data) => {
        console.log(data)
        this._questions = new QuestionData(data);
        console.log(this._questions)
      });
    }
  }

  set startTime(time) {
    this._startTime = this.time;
  }

  get answerTime() {
    return this._startTime - this.time;
  }

  get question() {
    return (this.time <= 0 || this.notes <= 0) ? null : this.questions.next();
  }

  get questions() {
    return this._questions;
  }
}

export default new GameState(initialState, initialResults);
