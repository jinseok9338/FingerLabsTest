export const makeOptions = (options: string[]) => {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
};