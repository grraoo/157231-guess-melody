class Timer {
  constructor(game, onTick = () => {}, onEnd = () => {}) {

    this.game = game;
    this.onTick = onTick;
    this.onEnd = onEnd;
  }
  tick() {
    --this.game.time;
    this.onTick();
    if (this.game.time <= 0) {
      this.message = `timer stop!`;
      this.pause();
      this.onEnd();
    }
    return this.game.time;
  }
  start() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        this.tick();
      }, 1000);
    }
  }
  pause() {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}

export default Timer;
