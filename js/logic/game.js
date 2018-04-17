import questions from "../data/question";

const initialState = {
  notes: 3,
  time: 300,
  screen: `welcome`,
  results: [0, 10, 20, 12, 16, 14, 15, 7, 5],
  questionsArr: questions
};

class GameState {
  constructor(state) {
    this.initialState = state;
    this.answers = [];
    this.notes = state.notes;
    this.time = state.time;
    this.screen = state.screen;
    this.results = state.results;
    this._questions = state.questionsArr;
  }
  reset() {
    this.answers.length = 0;
    this.notes = this.initialState.notes;
    this.time = this.initialState.time;
    this.screen = this.initialState.screen;
    this._questions = this.initialState.questionsArr;
  }

  get question() {
    return this.questions.next();
  }

  get questions() {
    return (this.time <= 0 || this.notes <= 0) ? null : this._questions;
  }
}

export default new GameState(initialState);
