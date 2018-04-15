import header from "./header";
import melodies from "../data/melodies";
import Random from "../utils/rnd";
import timer from "./timer";
import getElementFromTemplate from "../utils/getElementFromTemplate";
import switchScreen from "../utils/switch-screen";
import doAnswer from "../logic/doAnswer";
import getNewGenreScreen from "../screens/screen-genre";

const template = () => {
  const songs = Random.getArray(melodies, 3);
  const theSong = songs[Random.getInteger(songs.length)];

  return `<section class="main main--level main--level-artist">
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  </svg>
  ${timer()}
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

const generateAuthorScreen = () => getElementFromTemplate(template());
const getNewAuthorScreen = () => {
  const authorScreen = generateAuthorScreen();
  switchScreen(authorScreen);

  const answerAuthor = authorScreen.querySelector(`.main-list`);
  const doAuthorAnswer = () => doAnswer(4, getNewAuthorScreen, getNewGenreScreen);
  answerAuthor.addEventListener(`change`, doAuthorAnswer);
};

export default getNewAuthorScreen;
