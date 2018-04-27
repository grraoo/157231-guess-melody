import AbstractView from "./AbstractView";

class TimerView extends AbstractView {
  constructor(gameState) {
    super();
    this.time = gameState.time;
  }

  get template() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  </svg>
    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    </div>
  `;
  }
}

export default TimerView;
