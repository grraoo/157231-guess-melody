import melodies from "../data/melodies";
import rnd from "../utils/rnd";
import header from "./header";

const template = () => {
  const songs = rnd.array(melodies, 3);
  const theSong = songs[rnd.number(songs.length)];

  return `<section class="main main--level main--level-artist">
  ${header()}
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
};

export default template;
