import rnd from "./utils/rnd";
import switchScreen from "./utils/switch-screen";
import welcomeScreen from "./screens/screen-main";
import authorScreenTemplate from "./screens/screen-author";
import genreScreenTemplate from "./screens/screen-genre";
import resultsWin from "./screens/screen-result-win";
import resultsTime from "./screens/screen-result-time";
import resultsErrors from "./screens/screen-result-errors";
import gameState from "./logic/game";
import getElementFromTemplate from "./utils/getElementFromTemplate";
const resultScreens = [resultsWin, resultsTime, resultsErrors];

const generateAuthorScreen = () => getElementFromTemplate(authorScreenTemplate());
const generateGenreScreen = () => getElementFromTemplate(genreScreenTemplate());

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

  const answerAuthor = screenF.querySelector(`.main-list`);
  answerAuthor.addEventListener(`change`, function () {
    const answer = {
      success: !!Math.round(Math.random() + 0.5),
      time: rnd.number(60)
    };
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

      /**
       * author -> genre
       */

      getNewGenreScreen();
    } else {
      getNewAuthorScreen();
    }
  });
};

const getNewGenreScreen = () => {
  const screenS = generateGenreScreen();
  const answerBtn = screenS.querySelector(`.genre-answer-send`);
  const genreForm = screenS.querySelector(`.genre`);
  switchScreen(screenS);
  genreForm.addEventListener(`change`, function (e) {
    const answers = e.currentTarget.querySelectorAll(`input:checked`).length;

    answerBtn.disabled = answers === 0;
  });
  answerBtn.addEventListener(`click`, function () {
    const index = rnd.number(resultScreens.length);
    const resultScreen = resultScreens[index];
    const answer = {
      success: !!Math.round(Math.random() + 0.3),
      time: rnd.number(60)
    };
    gameState.answers.push(answer);
    if (!answer.success) {
      ++gameState.notes;
      if (gameState.notes > 2) {
        /**
         * genre -> result
         */
        switchScreen(resultScreen);
        const replayBtn = resultScreen.querySelector(`.main-replay`);
        replayBtn.addEventListener(`click`, function () {
          switchScreen(welcomeScreen);
        });
        return;
      }
    }
    if (gameState.answers.length > 9) {
      switchScreen(resultScreen);
      const replayBtn = resultScreen.querySelector(`.main-replay`);
      /**
       * result -> welcome
       */
      replayBtn.addEventListener(`click`, function () {
        switchScreen(welcomeScreen);
        gameState.answers.length = 0;
        gameState.notes = 0;
      });
    } else {
      getNewGenreScreen();
    }

  });
};

switchScreen(welcomeScreen);
