// Функция на вход принимает массив ответов пользователя;
// Функция на вход принимает кол-во оставшихся нот;
// Функция на выходе отдаёт кол-во набранных очков;
// Массив ответов должен хранить в себе данные об ответах пользователя на каждый вопрос по порядку — информацию об успешном или неуспешном ответе и времени, затраченном на ответ.
// let answer = {
//   success: true,
//   time: 25
// };

function countPoints(answers) {
  if (answers.length < 10) {
    return -1;
  }

  let rightAnswers = answers.filter((answer) => answer.success);

  if (rightAnswers.length < 8) {
    return -1;
  }

  let fastAnswers = rightAnswers.filter((answer) => answer.time < 30).length;
  let errorAnswers = (answers.length - rightAnswers.length) * 2;
  return rightAnswers.length + fastAnswers - errorAnswers;
}

export default countPoints;
