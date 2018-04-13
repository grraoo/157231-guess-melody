import gameState from "../logic/game";

const template = () => {
  return `
<div class="main-mistakes">
  ${new Array(gameState.notes).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(`\n\t`)}
</div>`;
};

export default template;
