import loaderScreen from "../screens/loader-screen";
import AuthorScreen from "../screens/screen-author";
import GenreScreen from "../screens/screen-genre";
import ResultScreen from "../screens/screen-result";
import screenMain from "../screens/screen-main";
import game from "./game";
import load from "../data/load";

const appNode = document.querySelector(`.app`);

class App {
  static showScreen(screen) {
    const mainContent = appNode.querySelector(`.main`);
    appNode.replaceChild(screen, mainContent);
  }
  static init() {
    this.showScreen(loaderScreen);
    load.getData(load.Endpoints.STATS + load.AppId, [])
        .then(game.setResults)
        .catch(load.onError);
    load.getData(load.Endpoints.QUESTIONS)
        .then(game.setQuestions)
        .then(() => {
          console.log(game);
          let count = 0;
          game.questions.audios.forEach((mediaSrc) => {
            const audio = new Audio();
            audio.src = mediaSrc;
            audio.addEventListener(`loadeddata`, (e) => {
              console.dir(e.target);
              if (++count === game.questions.audios.size) {
                this.showScreen(screenMain);
              }
            });
          });
        })
        .catch(load.onError);
        // .then(this.showScreen(screenMain));
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

export default App;
