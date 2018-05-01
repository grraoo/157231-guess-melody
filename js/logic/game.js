import QuestionData from "../data/question";
import Load from "../data/load";
const transfer = new Load();

const initialState = {
  notes: 3,
  time: 300
};

class GameState {
  constructor(state) {
    this.initialState = state;
    transfer.getStats().then((response) => response.json()).then((data) => {
      this.results = data[data.length - 1].results;
    }).catch(transfer.onError);
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
    transfer.getQuestions().then((response) => response.json())
        .then((data) => {
          this._questions = new QuestionData(data);
        })
        .catch(transfer.onError);
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

export default new GameState(initialState);
