export const shuffleOptions = (incorrectAnswers, correctAnswer) => {
  // copy all answers into a new array
  let options = incorrectAnswers.slice();
  // add the correct answer to the end of the list
  options.push(correctAnswer);
  // shuffle the array
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};
