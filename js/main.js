import rnd from "./utils/rnd";
import switchScreen from "./utils/switch-screen";
import welcomeScreen from "./screens/screen-main";
import authorScreenTemplate from "./screens/screen-author";
import genreScreen from "./screens/screen-genre";
import resultsWin from "./screens/screen-result-win";
import resultsTime from "./screens/screen-result-time";
import resultsErrors from "./screens/screen-result-errors";
import gameState from "./logic/game";
import getElementFromTemplate from "./utils/getElementFromTemplate";
const resultScreens = [resultsWin, resultsTime, resultsErrors];

const generateAuthorScreen = () => getElementFromTemplate(authorScreenTemplate());
const answerBtn = genreScreen.querySelector(`.genre-answer-send`);

/**
* welcome -> author
*/
const playBtn = welcomeScreen.querySelector(`.main-play`);
playBtn.addEventListener(`click`, function () {
  getNewAuthorScreen();
});

const getNewAuthorScreen = () => {
  const screenF = generateAuthorScreen();
  switchScreen(screenF);

  /**
   * author -> genre
   */
  const answerAuthor = screenF.querySelector(`.main-list`);
  answerAuthor.addEventListener(`change`, function () {
    gameState.answerDone++;
    gameState.answers.push({success: !!Math.round(Math.random() + 0.3), time: rnd.number(60)});
    if (gameState.answerDone > 4) {
      switchScreen(genreScreen);
      answerAuthor.reset();
      answerBtn.disabled = true;
    } else {
      getNewAuthorScreen();
    }
  });
};

/**
 * genre -> result
 */
const genreForm = genreScreen.querySelector(`.genre`);
genreForm.addEventListener(`change`, function (e) {
  let answers = e.currentTarget.querySelectorAll(`input:checked`).length;
  answerBtn.disabled = answers === 0;
});


answerBtn.addEventListener(`click`, function () {
  let index = Math.floor(Math.random() * resultScreens.length);
  let resultScreen = resultScreens[index];
  switchScreen(resultScreen);
  genreForm.reset();
  /**
 * result -> welcome
 */
  let replayBtn = resultScreen.querySelector(`.main-replay`);
  replayBtn.addEventListener(`click`, function () {
    switchScreen(welcomeScreen);
  });
});

switchScreen(welcomeScreen);
