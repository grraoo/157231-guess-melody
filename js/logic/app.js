import AuthorScreen from "../screens/screen-author";
import GenreScreen from "../screens/screen-genre";
import ResultScreen from "../screens/screen-result";
import game from "./game";

const appNode = document.querySelector(`.app`);

class app {
  static showScreen(screen) {
    const mainContent = appNode.querySelector(`.main`);
    appNode.replaceChild(screen, mainContent);
  }

  static doQuestion() {
    const question = game.questions.next();

    if (question) {
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
    game.time -= answer.time;
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
