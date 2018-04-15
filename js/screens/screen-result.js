import countPoints from "../logic/count-points";
import getResults from "../logic/getResults";
import gameState from "../logic/game";
import declOfNums from "../utils/declOfNum";
import welcomeScreen from "../screens/screen-main";
import getElementFromTemplate from "../utils/getElementFromTemplate";
import switchScreen from "../utils/switch-screen";

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
  const errors = 3 - gameState.notes;
  const points = countPoints(gameState.answers, errors);
  gameState.results.push(points);
  const rightAnswers = gameState.answers.filter((answer) => answer.success);
  const fastAnswers = rightAnswers.filter((answer) => answer.time < 30).length;
  const time = 300 - gameState.time;
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
  <div class="main-stat">За&nbsp;${minutes ? `${minutes}&nbsp;${declOfNums(minutes, words.mins)} и ` : ``} ${seconds}&nbsp;${declOfNums(seconds, words.secs)}
    <br>вы&nbsp;набрали ${points} ${declOfNums(points, words.points)} (${fastAnswers} ${declOfNums(fastAnswers, words.fast)})
    <br>совершив ${errors} ${declOfNums(errors, words.errs)}</div>
  <span class="main-comparison">${getResults(gameState.results, {"points": points, "attempts": gameState.notes, "timeLeft": 45})}</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
</section>`;
};

const template = () => {
  if (gameState.notes < 1) {
    return getTemplateErrors();
  } else if (gameState.time < 1) {
    return getTemplateNoTime();
  } else {
    return getTemplateWin();
  }
};

const generateResultScreen = () => getElementFromTemplate(template());

const getNewResultScreen = () => {
  const resultsScreen = generateResultScreen();
  switchScreen(resultsScreen);
  const replayBtn = resultsScreen.querySelector(`.main-replay`);
  replayBtn.addEventListener(`click`, function () {
    gameState.reset();
    switchScreen(welcomeScreen);
  });
};

export default getNewResultScreen;
