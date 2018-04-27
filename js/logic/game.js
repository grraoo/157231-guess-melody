import Questions from "../data/question";
import Timer from "./timer";

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
      AUTHOR: `AUTHOR`,
      GENRE: `GENRE`
    };
  }
  init() {
    this.answers = [];
    this.notes = this.initialState.notes;
    this._questions = new Questions();
    this.timer = null;
    this.timer = new Timer(this.initialState.time);
  }
  get time() {
    return this.timer.time;
  }
  reset() {
    this.init();
  }
  timerStart() {
    this.timerId = setInterval(this.timer.tick, 1000);
  }
  timerPause() {
    clearInterval(this.timerId);
  }
  get question() {
    return (this.time <= 0 || this.notes <= 0) ? null : this.questions.next();
  }

  get questions() {
    return this._questions;
  }
}
export default new GameState(initialState, initialResults);
