const ENDPOINTS = {
  stats: `https://es.dump.academy/guess-melody/stats/`,
  questions: `https://es.dump.academy/guess-melody/questions`
};

const onErrorHandler = (error) => {
  const node = document.createElement(`div`);
  node.style = `position: fixed; z-index: 2; width: 180px; margin: 0 auto; text-align: center; background-color: red;`;
  node.textContent = error;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

export default {
  "ENDPOINTS": ENDPOINTS,
  "APP_ID": `666`,
  "getData": (url, onSuccessCb, onErrorCb, empty) => {
    fetch(url)
        .then((response) => {
          if (empty && response.status === 404) {
            return empty;
          }
          return response.json();
        })
        .then(onSuccessCb)
        .catch(onErrorCb);
  },
  "saveData": (url, results, onErrorCb) => {
    fetch(url, {
      method: `post`,
      body: JSON.stringify(results), headers: {
        'Content-Type': `application/json`
      }
    }).catch(onErrorCb);
  },
  "onError": onErrorHandler
};
