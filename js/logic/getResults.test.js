import {assert} from 'chai';
import getResults from './getResults';
let myresultsAll = [6, -1, 0, 5, 8, 5, 4, 7, 20];
let myresultCurr = {
  points: 15,
  attempts: 1,
  timeLeft: 45,
};

describe(`Array`, () => {
  describe(`count total()`, () => {
    it(`should return 2`, () => {
      assert.equal(3, getResults(myresultsAll, myresultCurr));
    });
  });
});
