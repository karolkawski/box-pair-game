export const getRandomImage = (pairArray) => {
  const filteredPairs = pairArray.filter((pair) => {
    return pair.value[0] === false || pair.value[1] === false;
  });

  if (filteredPairs.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * filteredPairs.length);
  const globalIndex = filteredPairs[randomIndex].index;
  if (pairArray[globalIndex].value[0] === false) {
    pairArray[globalIndex].value[0] = true;
  } else if (pairArray[globalIndex].value[1] === false) {
    pairArray[globalIndex].value[1] = true;
  }

  return globalIndex;
};
