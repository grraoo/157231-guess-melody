import App from "../logic/app";
import AbstractView from "./AbstractView";
import game from "../logic/game";
import countPoints from "../logic/count-points";
import getResults from "../logic/getResults";
import declOfNums from "../utils/declOfNum";
import load from "../data/load";

const getTemplateErrors = () => {
  return `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Какая жалость!</h2>
  <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`;
};

const getTemplateNoTime = () => {
  return `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Увы и ах!</h2>
  <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`;
};

const getTemplateWin = () => {
  const errors = 3 - game.notes;
  const points = countPoints(game.answers, errors);

  game.results.push(points);
  load.saveData(load.ENDPOINTS.stats + load.APP_ID, {results: game.results});

  const rightAnswers = game.answers.filter((answer) => answer.success);
  const fastAnswers = rightAnswers.filter((answer) => answer.time < 30).length || 0;
  const time = 300 - game.time;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const words = {
    mins: [`минуту`, `минуты`, `минут`],
    secs: [`секунду`, `секунды`, `секунд`],
    errs: [`ошибку`, `ошибки`, `ошибок`],
    points: [`балл`, `балла`, `баллов`],
    fast: [`быстрый`, `быстрых`, `быстрых`],
    answers: [`ответ`, `ответа`, `ответов`],
  };

  return `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">
    За&nbsp;${minutes ? `${minutes}&nbsp;${declOfNums(minutes, words.mins)} и ` : ``} ${seconds}&nbsp;${declOfNums(seconds, words.secs)}<br>
    вы&nbsp;набрали ${points} ${declOfNums(points, words.points)} (${fastAnswers} ${declOfNums(fastAnswers, words.fast)})<br>
    совершив ${errors} ${declOfNums(errors, words.errs)}
  </div>
  <span class="main-comparison">${getResults(game.results, {"points": points, "attempts": game.notes, "timeLeft": game.time})}</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
</section>`;
};

class ResultScreen extends AbstractView {

  get template() {
    if (game.notes <= 0) {
      return getTemplateErrors();
    } else if (game.time <= 0) {
      return getTemplateNoTime();
    }
    return getTemplateWin();
  }

  bind(element) {

    if (game.timer) {
      game.timer.pause();
    }
    const replayBtn = element.querySelector(`.main-replay`);
    replayBtn.addEventListener(`click`, function () {
      game.init();
      App.init();
    });
  }
}

export default ResultScreen;
