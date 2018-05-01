export default class {
  constructor() {
    this.getStats = () => fetch(`https://es.dump.academy/guess-melody/stats/666`);

    this.getQuestions = () => fetch(`https://es.dump.academy/guess-melody/questions`);

    this.saveStats = (results) => {
      fetch(`https://es.dump.academy/guess-melody/stats/666`, {
        method: `post`,
        body: JSON.stringify({"results": results}), headers: {
          'Content-Type': `application/json`
        }
      }).then((response) => console.log(response));
    };

    this.onError = (error) => {
      const node = document.createElement(`div`);
      node.style = `position: fixed; z-index: 2; width: 180px; margin: 0 auto; text-align: center; background-color: red;`;
      node.textContent = error;
      document.body.insertAdjacentElement(`afterbegin`, node);
    };
  }
}
