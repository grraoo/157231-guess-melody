const Types = {
  AUTHOR: `artist`,
  GENRE: `genre`
};

class Question {
  constructor(question) {
    this.question = question.question;
    this.type = question.type;
    this.melodies = question.answers;

    switch (question.type) {
      case Types.AUTHOR:
      // Set используется чтобы упростить синтаксис проверки ответа в методе isRightAnswer(), чтобы не расписывать indexOf !== -1, всё вот это вот.
        this.rightAnswer = new Set(this.melodies.filter((song) => song.isCorrect));
        this.src = question.src;
        break;
      case Types.GENRE:
        this.rightAnswer = new Set(this.melodies.filter((song) => song.genre === question.genre));
        break;
      default:
        throw new Error(`WAT!& ${question.type}`);
    }
  }
  set answer(answer) {
    this._answer = answer;
  }
  get answer() {
    return this._answer;
  }
  isRightAnswer() {
    return this.answer.length === this.rightAnswer.size && this.answer.every((element) => this.rightAnswer.has(element));
  }
}

class QuestionsQueue {
  constructor(data) {
    this.items = [];
    data.forEach((question) => {
      this.items.push(new Question(question));
    });
  }
  next() {
    if (this.items.length) {
      return this.items.shift();
    }
    return null;
  }
}
export default QuestionsQueue;
