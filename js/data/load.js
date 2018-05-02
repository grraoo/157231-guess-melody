import QuestionData from "./question";
import game from "../logic/game";
import App from "../logic/app";
import screenMain from "../screens/screen-main";

const SERVER = {
  stats: `https://es.dump.academy/guess-melody/stats/`,
  appId: `666`,
  questions: `https://es.dump.academy/guess-melody/questions`
};
const onErrorHandler = (error) => {
  const node = document.createElement(`div`);
  node.style = `position: fixed; z-index: 2; width: 180px; margin: 0 auto; text-align: center; background-color: red;`;
  node.textContent = error;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

export default {
  getStats: () => {
    fetch(SERVER.stats + SERVER.appId).then((response) => response.json()).then((data) => {
      game.results = data[data.length - 1].results;
    }).catch(onErrorHandler);
  },

  getQuestions: () => {
    fetch(SERVER.questions).then((response) => response.json()).then((data) => {
      game.questions = new QuestionData(data);
      App.showScreen(screenMain);
    }).catch(onErrorHandler);
  },

  saveStats: (results) => {

    fetch(SERVER.stats + SERVER.appId, {
      method: `post`,
      body: JSON.stringify({"results": results}), headers: {
        'Content-Type': `application/json`
      }
    }).catch(onErrorHandler);
  },

  onError: onErrorHandler
};
