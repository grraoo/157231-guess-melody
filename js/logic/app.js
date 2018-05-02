import loaderScreen from "../screens/loader-screen";
import AuthorScreen from "../screens/screen-author";
import GenreScreen from "../screens/screen-genre";
import ResultScreen from "../screens/screen-result";
import screenMain from "../screens/screen-main";
import game from "./game";
import load from "../data/load";
import initPlayerControl from "./player-control";
import QuestionData from "../data/question";

const appNode = document.querySelector(`.app`);
const setQuestions = (data) => {
  game.questions = new QuestionData(data);
  app.showScreen(screenMain);
};
class app {
  static showScreen(screen) {
    const mainContent = appNode.querySelector(`.main`);
    appNode.replaceChild(screen, mainContent);
  }
  static init() {
    this.showScreen(loaderScreen);
    load.getData(load.ENDPOINTS.stats + load.APP_ID, game.setResults, load.onError, []);
    load.getData(load.ENDPOINTS.questions, setQuestions, load.onError);

    initPlayerControl();
  }
  static doQuestion() {
    const question = game.questions.next();

    if (question) {

      game.startTime = game.time;

      switch (question.type) {
        case game.TYPES.AUTHOR:
          const screenAuthor = new AuthorScreen(question);
          this.showScreen(screenAuthor.element);
          break;
        case game.TYPES.GENRE:
          const screenGenre = new GenreScreen(question);
          this.showScreen(screenGenre.element);
          break;
        default:
          throw new Error(`WAT?! Unknown type ${question.type}`);
      }
    } else {
      const resultScreen = new ResultScreen().element;
      this.showScreen(resultScreen);
    }
  }

  static doAnswer(answer) {
    game.answers.push(answer);
    if (!answer.success) {
      --game.notes;
    }
    if (!game.questions.items.length || game.notes <= 0 || game.time <= 0) {
      const resultScreen = new ResultScreen().element;
      this.showScreen(resultScreen);
      return;
    }
    this.doQuestion();
  }
}

export default app;
