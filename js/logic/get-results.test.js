import {assert} from 'chai';
import getResults from './get-results';
const myresultsAll = [6, -1, 0, 5, 8, 5, 4, 7, 20];
const myresultCurr = {
  points: 1,
  attempts: 1,
  timeLeft: 1,
};

describe(`Array`, () => {
  describe(`count total()`, () => {
    it(`should return string ${getResults(myresultsAll, myresultCurr)}`, () => {
      assert.equal(`string`, typeof getResults(myresultsAll, myresultCurr));
    });
  });
});
