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
