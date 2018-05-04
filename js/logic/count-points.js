const MAX_ERRORS = 2;
const ANSWER_QTY = 10;
const FAST_TIME = 30;
const countPoints = (answers, errors) => {
  if (answers.length < ANSWER_QTY || errors > MAX_ERRORS) {
    return -1;
  }

  const rightAnswers = answers.filter((answer) => answer.success);

  const fastAnswers = rightAnswers.filter((answer) => answer.time < FAST_TIME).length;
  const errorAnswers = errors * 2;

  return rightAnswers.length + fastAnswers - errorAnswers;
};

export default countPoints;
