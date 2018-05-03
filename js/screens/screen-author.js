import QuestionScreen from "./question-screen";

class AuthorScreen extends QuestionScreen {

  get template() {
    const {melodies: songs, question: screenQuestion, src} = this.question;
    return `<section class="main main--level main--level-artist">
        ${this.header()}
        <div class="main-wrap">
          <h2 class="title main-title">${screenQuestion}</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio src="${src}"  preload="true"></audio>
              <button class="player-control player-control--play" data-audio="${this.question.src}"></button>
              <div class="player-track">
                <span class="player-status" data-audio="${this.question.src}"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
            ${songs.map((song) => (`<div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="${song.title.replace(/ /g, `_`)}" name="answer" value="${song.image.url}"/>
              <label class="main-answer" for="${song.title.replace(/ /g, `_`)}">
                <img class="main-answer-preview" src="${song.image.url}" alt="${song.title}" width="134" height="134">
                ${song.title}
              </label>
            </div>`)).join(`\n\t`)}
          </form>
        </div>
      </section>`;
  }
  collectAnswer(answers) {
    return (song) => {
      return [...answers].some((answer) => song.image && (song.image.url === answer.value));
    };
  }
  bind(element) {
    const answerAuthor = element.querySelector(`.main-list`);
    const doCurrentAnswer = () => {
      this.doCurrentAnswer(answerAuthor);
    };

    answerAuthor.addEventListener(`change`, doCurrentAnswer);
    this.bindTimer(element);
  }

}

export default AuthorScreen;
