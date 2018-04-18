import songs from "./melodies";
import rnd from "../utils/rnd";

const TYPES = {
  AUTHOR: `AUTHOR`,
  GENRE: `GENRE`
};

class Question {
  constructor(melodies) {
    this.type = Math.random() < 0.5 ? TYPES.AUTHOR : TYPES.GENRE;
    switch (this.type) {
      case TYPES.AUTHOR:
        this.melodies = rnd.getArray(melodies, 3);
        this.theSong = this.melodies[rnd.getInteger(this.melodies.length)];
        this.rightAnswer = new Set(this.melodies.filter((song) => song.artist === this.theSong.artist));
        break;
      case TYPES.GENRE:
        this.melodies = rnd.getArray(melodies, 4);
        this.theSong = this.melodies[rnd.getInteger(4)];
        this.rightAnswer = new Set(this.melodies.filter((song) => song.genre === this.theSong.genre));
        break;
      default:
        throw new Error(`WAT?! Wrong type: ${this.type}! Must be "AUTHOR" or "GENRE"`);
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
    let isRight = [...this.answer].every((element) => {
      return this.rightAnswer.has(element);
    });
    return isRight;
  }
}

class QuestionsQueue {
  constructor() {
    const questions = [];
    let i = 0;
    while (i < 10) {
      questions[i++] = new Question(songs);
    }
    this.items = questions;
  }
  next() {
    if (this.items.length) {
      return this.items.shift();
    }
    return null;
  }
}

export default QuestionsQueue;
