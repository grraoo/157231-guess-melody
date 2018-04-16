import AbstractView from "./AbstractView";
import gameState from "../logic/game";


class MistakesView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
    <div class="main-mistakes">
    ${new Array(gameState.notes).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(`\n\t`)}
    </div>`;
  }
}

export default new MistakesView(gameState);
