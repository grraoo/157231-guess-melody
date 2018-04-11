const getRandomNumber = (number) => Math.floor(Math.random() * number);

const getRandomArray = (array, length) => {
  const copyArr = [...array];
  const rndArr = [];
  while (rndArr.length < length || !copyArr.length) {
    const index = getRandomNumber(copyArr.length);
    const hasArtist = rndArr.filter((song) => song.artist === copyArr[index].artist).length;
    if (!hasArtist) {
      rndArr.push(copyArr[index]);
      copyArr.splice(index, 1);
    }
  }
  return rndArr;
};

export default {
  number: getRandomNumber,
  array: getRandomArray
};
