export const createArray = (n) => {
  return Array.from({ length: n }, (_, index) => ({
    index: index,
    value: [false, false],
  }));
};
