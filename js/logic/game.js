const initialState = {
  notes: 3,
  time: 300,
  screen: `welcome`,
};

class GameState {
  constructor(state, results = [0, 10, 20, 12, 16, 14, 15, 8, 5]) {
    this.answers = [];
    this.notes = state.notes;
    this.time = state.time;
    this.screen = state.screen;
    this.initialState = state;
    this.results = results;
  }
  reset() {
    this.answers.length = 0;
    this.notes = this.initialState.notes;
    this.time = this.initialState.time;
    this.screen = this.initialState.screen;
  }
}

export default new GameState(initialState);
