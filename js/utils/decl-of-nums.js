/**
 *
 * @param {Number} number
 * @param {Array} titles  [{1}`минута`, {2-4}`минуты`, {...}`минут`]
 */

export default (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];

  const isLast = number % 100 > 4 && number % 100 < 20;
  const indexNumber = (number % 10 < 5) ? number % 10 : 0;
  const index = isLast ? 2 : cases[indexNumber];

  return titles[index];
};
