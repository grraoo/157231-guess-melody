import {
  assert
} from 'chai';
import countPoints from './count-points';

const answers = new Array(10).fill({success: true, time: 30});
const answersfast = new Array(10).fill({success: true, time: 25});
const answers9 = new Array(9).fill({success: true, time: 31});

const answersFalse = [
  ...new Array(7).fill({success: true, time: 25}),
  ...new Array(3).fill({success: false, time: 25})
];

const answersHalfFast = [
  ...new Array(5).fill({success: true, time: 25}),
  ...new Array(5).fill({success: true, time: 31})
];

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
