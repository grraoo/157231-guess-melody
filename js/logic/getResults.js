// Функция на вход принимает массив результатов игр других игроков;
// Функция на вход принимает объект результата с кол-вом набранных баллов, кол-вом оставшихся нот и кол-вом оставшегося времени;
// Функция на выходе выдаёт строку результата:
//     Если игрок выиграл, то его результат должен быть выведен в виде фразы: Вы заняли i место из t игроков. Это лучше, чем у n% игроков, где i — место, которое занял пользователь, t — общее кол-во игроков, n — процент успеха игрока;
//     Если игрок проиграл и у него закончилось время, то должна быть выведена фраза: «Время вышло! Вы не успели отгадать все мелодии»;
//     Если игрок проиграл и у него закончились попытки, то должна быть выведена фраза: «У вас закончились все попытки. Ничего, повезёт в следующий раз!».

// let myresultsAll = [6, -1, 4, 7, 20];
// let myresultCurr = {
//   points: 15,
//   attempts: 0,
//   timeLeft: 45,
// };

function getResults(all, current) {
  if (current.timeLeft <= 0) {
    return `«Время вышло! Вы не успели отгадать все мелодии»`;
  }
  if (current.attempts < 1) {
    return `«У вас закончились все попытки. Ничего, повезёт в следующий раз!»`;
  }

  let points = current.points;
  let results = [...all, points].sort((a, b) => Math.sign(a - b));
  let index = results.indexOf(points);
  let place = results.length - index;
  let percent = parseInt(((index / results.length) * 100), 10);
  return `Вы заняли ${place} место из ${results.length} игроков. Это лучше, чем у ${percent}% игроков`;
}


export default getResults;
