import {assert} from 'chai';
import countPoints from './count-points';

const answers = [{
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}];
const answersFalse = [{
  success: false,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: false,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: false,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}, {
  success: true,
  time: 30
}];

const answersfast = [{
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}];
const answersHalfFast = [{
  success: true,
  time: 31
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 31
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 31
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 31
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 31
}, {
  success: true,
  time: 25
}];


const answers9 = [{
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}, {
  success: true,
  time: 25
}];

describe(`Array`, () => {
  describe(`count total()`, () => {
    it(`should return 10 points`, () => {
      assert.equal(10, countPoints(answers, 0));
    });
    it(`should return 20 points fastanswers`, () => {
      assert.equal(20, countPoints(answersfast, 0));
    });
    it(`should return 15 points answersHalfFast`, () => {
      assert.equal(15, countPoints(answersHalfFast, 0));
    });
    it(`should have no more 3 errors`, () => {
      assert.equal(-1, countPoints(answersFalse, 3));
    });
    it(`should have 10 answers`, () => {
      assert.equal(-1, countPoints(answers9, 2));
    });
  });
});
