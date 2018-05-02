export default {
  "endpoints": {
    stats: `https://es.dump.academy/guess-melody/stats/`,
    questions: `https://es.dump.academy/guess-melody/questions`
  },
  "appId": `666`,
  "getData": (url, empty) => {
    fetch(url).then((response) => {
      if (empty && response.status === 404) {
        return empty;
      }
      return response.json();
    });
  },
  "saveData": (url, results) => {
    fetch(url, {
      method: `post`,
      body: JSON.stringify(results), headers: {
        'Content-Type': `application/json`
      }
    });
  },
  "onError": (error) => {
    const node = document.createElement(`div`);
    node.style = `position: fixed; z-index: 2; width: 180px; margin: 0 auto; text-align: center; background-color: red;`;
    node.textContent = error;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }
};
