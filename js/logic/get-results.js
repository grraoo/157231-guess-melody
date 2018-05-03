export default (all, current) => {
  if (current.timeLeft <= 0) {
    return `«Время вышло! Вы не успели отгадать все мелодии»`;
  }
  if (current.attempts <= 0) {
    return `«У вас закончились все попытки. Ничего, повезёт в следующий раз!»`;
  }

  const points = current.points;
  // const results = [...all, points].sort((a, b) => Math.sign(a - b));
  const results = [...all].sort((a, b) => Math.sign(a - b));
  const index = results.indexOf(points);
  const place = results.length - index;
  const percent = parseInt(((index / results.length) * 100), 10);
  return `Вы заняли ${place} место из ${results.length} игроков. Это лучше, чем у ${percent}% игроков`;
};
