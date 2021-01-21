const palindrome = (string) => string.split('').reverse().join('');

const average = (array) => {
  const itemSumReducer = (sum, item) => {
    return sum + item;
  };

  return array.length < 1 ? 0 : array.reduce(itemSumReducer, 0) / array.length;
};

module.exports = {
  palindrome,
  average,
};
