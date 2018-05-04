import QuestionScreen from "./question-screen";

class GenreScreen extends QuestionScreen {
  get template() {
    const {melodies: songs, question} = this.question;
    return `<section class="main main--level main--level-genre">
      ${this.header()}
      <div class="main-wrap">
        <h2 class="title">${question}</h2>
        <form class="genre">
          ${songs.map((song) => (`<div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio src="${song.src}" preload="true"></audio>
                <button class="player-control player-control--play" data-audio="${song.src}"></button>
                <div class="player-track">
                  <span class="player-status" data-audio="${song.src}"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="${song.src.trim()}" id="${song.src.trim()}">
            <label class="genre-answer-check" for="${song.src.trim()}"></label>
          </div>`)).join(`\n\t`)}
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>`;
  }
  collectAnswer(answers) {
    return (song) => {
      return [...answers].some((answer) => song.src === answer.value);
    };
  }
  bind(element) {
    const genreForm = element.querySelector(`.genre`);
    const answerBtn = genreForm.querySelector(`.genre-answer-send`);

    genreForm.addEventListener(`change`, (e) => {
      answerBtn.disabled = e.currentTarget.querySelectorAll(`input:checked`).length === 0;
    });

    const doCurrentAnswer = () => {
      this.doCurrentAnswer(genreForm);
    };
    answerBtn.addEventListener(`click`, doCurrentAnswer);
    this.bindTimer(element);
  }
}

export default GenreScreen;
