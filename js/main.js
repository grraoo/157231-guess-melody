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
  gameState.notes = 0;
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
    const answer = {success: !!Math.round(Math.random() - 0.2), time: rnd.number(60)};
    gameState.answers.push(answer);
    if (!answer.success) {
      ++gameState.notes;
      if (gameState.notes > 2) {
        const index = rnd.number(resultScreens.length);
        const resultScreen = resultScreens[index];
        switchScreen(resultScreen);
        const replayBtn = resultScreen.querySelector(`.main-replay`);
        replayBtn.addEventListener(`click`, function () {
          switchScreen(welcomeScreen);
        });
        return;
      }
    }

    if (gameState.answers.length > 4) {
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
  const answers = e.currentTarget.querySelectorAll(`input:checked`).length;
  answerBtn.disabled = answers === 0;
});


answerBtn.addEventListener(`click`, function () {
  const index = rnd.number(resultScreens.length);
  const resultScreen = resultScreens[index];
  switchScreen(resultScreen);
  genreForm.reset();
  /**
 * result -> welcome
 */
  const replayBtn = resultScreen.querySelector(`.main-replay`);
  replayBtn.addEventListener(`click`, function () {
    switchScreen(welcomeScreen);
  });
});

switchScreen(welcomeScreen);
