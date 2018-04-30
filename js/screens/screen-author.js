import QuestionScreen from "./question-screen";

class AuthorScreen extends QuestionScreen {

  get template() {
    const {melodies: songs, question} = this.question;

    // uncomment to see answers in console
    // console.clear();
    // console.log(theSong.artist);
    return `<section class="main main--level main--level-artist">
    ${this.header()}
  <div class="main-wrap">
    <h2 class="title main-title">${question}</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio src="${this.question.src}"></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">
    ${songs.map((song) => {
    return `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="${song.title.replace(/ /g, `_`)}" name="answer" value="${song.title}"/>
      <label class="main-answer" for="${song.title.replace(/ /g, `_`)}">
        <img class="main-answer-preview" src="${song.image.url}"
              alt="${song.title}" width="134" height="134">
        ${song.title}
      </label>
    </div>`;
  }
  ).join(`\n\t`)}
    </form>
  </div>
  </section>`;
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
