import getElementFromTemplate from "../utils/getElementFromTemplate";
import melodies from "../data/melodies";
import gameState from "../logic/game";
let errors = gameState.notes;

const songs = [];
let index = Math.floor(Math.random() * melodies.length);
songs.push(melodies[index]);
melodies.splice(index, 1);
index = Math.floor(Math.random() * melodies.length);
songs.push(melodies[index]);
melodies.splice(index, 1);
index = Math.floor(Math.random() * melodies.length);
songs.push(melodies[index]);
melodies.splice(index, 1);

let theSong = songs[Math.floor(Math.random() * songs.length)];

const template =
`<section class="main main--level main--level-artist">
<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins">05</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">00</span>
  </div>
</svg>
<div class="main-mistakes">
  ${new Array(errors).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(`\n\t`)}
</div>

<div class="main-wrap">
  <h2 class="title main-title">Кто исполняет эту песню?</h2>
  <div class="player-wrapper">
    <div class="player">
      <audio src="${theSong.src}"></audio>
      <button class="player-control player-control--pause"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>
  <form class="main-list">
  ${songs.map((song, number) => {
    return `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
      <label class="main-answer" for="answer-${number}">
        <img class="main-answer-preview" src="${song.image}"
             alt="${song.artist}" width="134" height="134">
        ${song.artist}
      </label>
    </div>`;
  }
  ).join(`\n\t`)}
  </form>
</div>
</section>`;
const screen = getElementFromTemplate(template);

export default screen;
