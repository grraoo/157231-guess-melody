import gameState from "../logic/game";


const template = () => {
  const time = gameState.time;
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  return `
  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins">${mins < 10 ? `0${mins}` : mins}</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">${secs < 10 ? `0${secs}` : secs}</span>
  </div>
`;
};

export default template;
