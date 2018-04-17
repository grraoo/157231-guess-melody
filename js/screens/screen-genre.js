import header from "./header";
import timer from "./timer";
import getElementFromTemplate from "../utils/getElementFromTemplate";
import switchScreen from "../utils/switch-screen";
import doAnswer from "../logic/doAnswer";
import rnd from "../utils/rnd";

const template = (question) => {
  const songs = question.melodies;
  const theSong = question.theSong;
  // console.log([...question.melodies].filter((song, index) => {
  //   if (theSong.genre === song.genre) {
  //     console.log(index);
  //   }
  //   return theSong.genre === song.genre;
  // }));
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
          <input type="checkbox" name="answer" value="${song.name.trim()}" id="a-${number}">
          <label class="genre-answer-check" for="a-${number}"></label>
        </div>`;
  }).join(`\n\t`)}
        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
  </section>`;
};
const generateGenreScreen = (question) => getElementFromTemplate(template(question));
const getNewGenreScreen = (question) => {
  const genreScreen = generateGenreScreen(question);
  const answerBtn = genreScreen.querySelector(`.genre-answer-send`);
  const genreForm = genreScreen.querySelector(`.genre`);
  switchScreen(genreScreen);

  genreForm.addEventListener(`change`, function (e) {
    answerBtn.disabled = e.currentTarget.querySelectorAll(`input:checked`).length === 0;
  });

  const doGenrerAnswer = () => {
    const answers = genreForm.querySelectorAll(`input:checked`);

    question.answer = new Set([...question.melodies].filter((song) => {
      return [...answers].some((answer) => song.name === answer.value);
    }));
    const answer = {
      success: question.isRightAnswer(),
      time: rnd.getInteger(45)
    };
    doAnswer(answer);
  };
  answerBtn.addEventListener(`click`, doGenrerAnswer);
};
export default getNewGenreScreen;
