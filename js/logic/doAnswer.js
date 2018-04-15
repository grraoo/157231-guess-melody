import Random from "../utils/rnd";
import gameState from "./game";
import getNewResultScreen from "../screens/screen-result";

export default function (maxAnsewrs, more, next) {
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
}
