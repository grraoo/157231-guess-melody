import getNewAuthorScreen from "../screens/screen-author";
import getNewGenreScreen from "../screens/screen-genre";
import game from "./game";
import getNewResultScreen from "../screens/screen-result";


export default (question) => {
  if (question) {
    switch (question.type) {
      case game.TYPES.AUTHOR:
        getNewAuthorScreen(question);
        break;
      case game.TYPES.GENRE:
        getNewGenreScreen(question);
        break;
      default:
        throw new Error(`WAT?! Unknown type ${question.type}`);
    }
  } else {
    getNewResultScreen();
  }
};
