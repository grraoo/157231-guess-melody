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
    this._answer = new Set(answer);
  }
  get answer() {
    return this._answer;
  }
  isRightAnswer() {
    if (this.answer.size !== this.rightAnswer.size) {
      return false;
    }
    return [...this.answer].every((element) => this.rightAnswer.has(element));
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
