// Функция на вход принимает массив ответов пользователя;
// Функция на вход принимает кол-во оставшихся нот;
// Функция на выходе отдаёт кол-во набранных очков;
// Массив ответов должен хранить в себе данные об ответах пользователя на каждый вопрос по порядку — информацию об успешном или неуспешном ответе и времени, затраченном на ответ.
// let answer = {
//   success: true,
//   time: 25
// };
const MAX_ERRORS = 2;
function countPoints(answers, errors) {
  if (answers.length < 10 || errors > MAX_ERRORS) {
    return -1;
  }

  const rightAnswers = answers.filter((answer) => answer.success);

  const fastAnswers = rightAnswers.filter((answer) => answer.time < 30).length;
  const errorAnswers = errors * 2;

  return rightAnswers.length + fastAnswers - errorAnswers;
}

export default countPoints;
