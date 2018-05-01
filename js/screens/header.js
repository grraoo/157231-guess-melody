const template = (gameState) => {
  const game = gameState;

  return `
    <div class="main-mistakes">
      ${new Array(game.notes).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(`\n\t`)}
    </div>`;
};

export default template;
