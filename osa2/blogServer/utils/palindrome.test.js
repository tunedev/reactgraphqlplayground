const { palindrome, average } = require('./for-testing');

describe('Palindrome tests', () => {
  test('palindrome of a', () => {
    const result = palindrome('a');

    expect(result).toBe('a');
  });

  test('Palindrome of react', () => {
    const result = palindrome('react');

    expect(result).toBe('tcaer');
  });

  test('Palindrome of aippuakauppias', () => {
    const result = palindrome('saippuakauppias');

    expect(result).toEqual('saippuakauppias');
  });
});

describe('Average', () => {
  test('test if an array of one value returns the value', () => {
    const arrayOfAValue = [565];
    const result = average(arrayOfAValue);

    expect(result).toEqual(arrayOfAValue[0]);
  });

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test('of empty array is zero', () => {
    expect(average([])).toBe(0);
  });
});
