import AuthorScreen from "../screens/screen-author";
import GenreScreen from "../screens/screen-genre";
import game from "./game";
import getNewResultScreen from "../screens/screen-result";
import switchScreen from "../utils/switch-screen";

export default (question) => {
  if (question) {
    switch (question.type) {
      case game.TYPES.AUTHOR:
        const screenAuthor = new AuthorScreen(question);
        switchScreen(screenAuthor.element);
        break;
      case game.TYPES.GENRE:
        const screenGenre = new GenreScreen(question);
        switchScreen(screenGenre.element);
        break;
      default:
        throw new Error(`WAT?! Unknown type ${question.type}`);
    }
  } else {
    getNewResultScreen();
  }
};
