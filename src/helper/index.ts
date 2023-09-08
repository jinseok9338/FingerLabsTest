export const makeOptions = (options: string[]) => {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
};

export const validateNumber = (value: string) => {
  // if the value is not number return false otherwide return true
  return !isNaN(Number(value));
};
