import questions from "../data/question";

const initialState = {
  notes: 3,
  time: 300,
  screen: `welcome`,
};
const resultsArr = [0, 10, 20, 12, 16, 14, 15, 7, 5];

class GameState {
  constructor(state, results, questionsArr) {
    this.answers = [];
    this.notes = state.notes;
    this.time = state.time;
    this.screen = state.screen;
    this.initialState = state;
    this.results = results;
    this.questions = questionsArr;
  }
  reset() {
    this.answers.length = 0;
    this.notes = this.initialState.notes;
    this.time = this.initialState.time;
    this.screen = this.initialState.screen;
  }

  get question() {
    return this.questions.next();
  }
  set questions(questionsArr) {
    this._questions = questionsArr;
  }

  get questions() {
    return this._questions;
  }

}

export default new GameState(initialState, resultsArr, questions);
