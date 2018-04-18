import QuestionScreen from "./question-screen";

class GenreScreen extends QuestionScreen {
  get template() {
    const {melodies: songs, theSong} = this.question;

    // uncomment to see answers in console
    // console.clear();
    // [...this.question.melodies].forEach((song, index) => {
    //   if (theSong.genre === song.genre) {
    //     console.log(index);
    //   }
    // });
    return `<section class="main main--level main--level-genre">
      ${this.header()}
      <div class="main-wrap">
        <h2 class="title">Выберите ${theSong.genre} треки</h2>
        <form class="genre">
          ${songs.map((song) => {
    return `<div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio src="${song.src}"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="${song.name.trim()}" id="${song.name.replace(/ /g, `_`)}">
      <label class="genre-answer-check" for="${song.name.replace(/ /g, `_`)}"></label>
    </div>`;
  }).join(`\n\t`)}
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>`;
  }

  bind(element) {
    const genreForm = element.querySelector(`.genre`);
    const answerBtn = genreForm.querySelector(`.genre-answer-send`);

    genreForm.addEventListener(`change`, function (e) {
      answerBtn.disabled = e.currentTarget.querySelectorAll(`input:checked`).length === 0;
    });

    const doCurrentAnswer = () => {
      this.doCurrentAnswer(genreForm);
    };
    answerBtn.addEventListener(`click`, doCurrentAnswer);
  }
}

export default GenreScreen;
