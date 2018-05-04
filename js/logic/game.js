import QuestionData from "../data/questions";

const initialState = {
  notes: 3,
  time: 300
};

class GameState {
  constructor(state) {
    this.initialState = state;
    this.init();
    this.TYPES = {
      AUTHOR: `artist`,
      GENRE: `genre`
    };
    this.setResults = (data) => {
      this.results = data.length ? data[data.length - 1].results : [];
    };
    this.setQuestions = (data) => {
      this.questions = new QuestionData(data);
    };
  }

  set startTime(time) {
    this._startTime = this.time;
  }
  get answerTime() {
    return this._startTime - this.time;
  }

  set questions(data) {
    this._questions = data;
  }
  get questions() {
    return this._questions;
  }

  get question() {
    return (this.time <= 0 || this.notes <= 0) ? null : this.questions.next();
  }

  init() {
    this.answers = [];
    this.notes = this.initialState.notes;
    this.time = this.initialState.time;
    this.timer = null;
    this._questions = null; // will be filled in app.js after loading
    this.results = null; // will be filled in app.js after loading
  }
}

export default new GameState(initialState);
