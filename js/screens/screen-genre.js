import header from "./header";
import melodies from "../data/melodies";
import rnd from "../utils/rnd";

const template = () => {
  const songs = rnd.array(melodies, 4);
  const theSong = songs[rnd.number(songs.length)];

  return `<section class="main main--level main--level-genre">
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
  }).join(`\
  n\ t `)};
        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
  </section>`;
};

export default template;
