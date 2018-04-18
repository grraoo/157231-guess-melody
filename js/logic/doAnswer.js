import game from "./game";
import getNewResultScreen from "../screens/screen-result";
import doQuestion from "./do-question";

export default function (answer) {
  game.time -= answer.time;
  game.answers.push(answer);
  if (!answer.success) {
    --game.notes;
  }
  if (!game.questions.items.length || game.notes <= 0) {
    getNewResultScreen();
    return;
  }
  doQuestion(game.questions.next());
}
