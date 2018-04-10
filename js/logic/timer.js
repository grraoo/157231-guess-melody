//     Функция на вход должна принимать время, в течение которого будет работать таймер;
//     Функция на выходе возвращает объект таймера;
//     При каждом обновлении таймера (вызов метода tick), время уменьшается на единицу;
//     При достижении конца, таймер должен сообщить о том, что он закончен.

function initTimer(seconds) {

  const timerObj = {
    time: seconds,
    message: ``,
    tick() {
      --this.time;
      if (this.time <= 0) {
        this.message = `timer stop!`;
        return `${this.time}: ${this.message}`;
      }
      return this.time;
    }
  };

  return timerObj;
}

export default initTimer;
