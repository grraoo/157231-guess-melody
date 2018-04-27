class Timer {
  constructor(time, timeEnd = () => {}, tickCb = () => {console.log(`tick: `, this.time)}) {
    this.time = time;
    this.timeEnd = timeEnd;
    this.tickCb = tickCb;
  }
  tick() {
    --this.time;
    this.tickCb();
    if (this.time <= 0) {
      this.message = `timer stop!`;
      this.pause();
      this.timeEnd();
    }
    return this.time;
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
