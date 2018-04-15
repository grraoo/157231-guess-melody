import Random from "./utils/rnd";
import switchScreen from "./utils/switch-screen";
import gameState from "./logic/game";
import getElementFromTemplate from "./utils/getElementFromTemplate";
import welcomeScreen from "./screens/screen-main";
import authorScreenTemplate from "./screens/screen-author";
import genreScreenTemplate from "./screens/screen-genre";
import resultScreenTemplate from "./screens/screen-result";

const generateAuthorScreen = () => getElementFromTemplate(authorScreenTemplate());
const generateGenreScreen = () => getElementFromTemplate(genreScreenTemplate());
const generateResultScreen = () => getElementFromTemplate(resultScreenTemplate());

const doAnswer = function (maxAnsewrs, more, next) {
  const answer = {
    success: !!Math.round(Math.random() + 0.3),
    time: Random.getInteger(45)
  };
  gameState.time -= answer.time;
  gameState.answers.push(answer);
  if (!answer.success) {
    --gameState.notes;
    if (gameState.notes < 1) {
      getNewResultScreen();
      return;
    }
  }

  if (gameState.answers.length > maxAnsewrs) {
    next();
  } else {
    more();
  }
};

const playBtn = welcomeScreen.querySelector(`.main-play`);
playBtn.addEventListener(`click`, function () {
  getNewAuthorScreen();
});

const getNewResultScreen = () => {
  const resultsScreen = generateResultScreen();
  switchScreen(resultsScreen);
  const replayBtn = resultsScreen.querySelector(`.main-replay`);
  replayBtn.addEventListener(`click`, function () {
    gameState.reset();
    switchScreen(welcomeScreen);
  });
};

const getNewAuthorScreen = () => {
  const authorScreen = generateAuthorScreen();
  switchScreen(authorScreen);

  const answerAuthor = authorScreen.querySelector(`.main-list`);
  const doAuthorAnswer = () => doAnswer(4, getNewAuthorScreen, getNewGenreScreen);
  answerAuthor.addEventListener(`change`, doAuthorAnswer);
};

const getNewGenreScreen = () => {
  const genreScreen = generateGenreScreen();
  const answerBtn = genreScreen.querySelector(`.genre-answer-send`);
  const genreForm = genreScreen.querySelector(`.genre`);
  switchScreen(genreScreen);
  genreForm.addEventListener(`change`, function (e) {
    const answers = e.currentTarget.querySelectorAll(`input:checked`).length;
    answerBtn.disabled = answers === 0;
  });

  const doGenrerAnswer = () => doAnswer(9, getNewGenreScreen, getNewResultScreen);
  answerBtn.addEventListener(`click`, doGenrerAnswer);
};

switchScreen(welcomeScreen);
