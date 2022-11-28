/*** This file manages the businness logic of the app ***/

export const Operators = (input) => {
  const values = [];

  /* Iteration over every row element */
  input.forEach((el) => {
    const value = el.value;
    let input = el.input;
    const isEnable = el.isEnable;

    /* set input value to 0 if the row is disabled */
    if (!isEnable) input = 0;

    /* pushes every value into the array of values */
    const number = value + input;
    values.push(+number);
  });

  const initialValue = 0;
  /* reduce method on values array to sum and/or subtract all the values stored in the array */
  let result = values.reduce((acc, currentValue) => acc + currentValue, initialValue);

  /**
   * if user input is not a number, result will be set at 0
   * this will manage the "e" char, allowed in input type number
   */
  if (isNaN(result)) {
    result = 0;
  }

  return result;
};
