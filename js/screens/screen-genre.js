import header from "./header";
import melodies from "../data/melodies";
import Random from "../utils/rnd";
import timer from "./timer";

const template = () => {
  const songs = Random.getArray(melodies, 4);
  const theSong = songs[Random.getInteger(songs.length)];

  return `<section class="main main--level main--level-genre">
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  </svg>
  ${timer()}
  ${header()}
    <div class="main-wrap">
      <h2 class="title">Выберите ${theSong.genre} треки</h2>
      <form class="genre">
      ${songs.map((song, number) => {
    return ` <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${song.src}"></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-${number}" id="a-${number}">
          <label class="genre-answer-check" for="a-${number}"></label>
        </div>`;
  }).join(`\n\t`)}
        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
  </section>`;
};

export default template;
