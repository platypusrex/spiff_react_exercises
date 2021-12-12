export const parseString = (str) => {
  // short circuit if no string
  if (!str) {
    return;
  }

  let counter = {};
  // split the string and iterate over each character
  str.split('').forEach(char => {
    // short circuit if the current character is not alphabetic
    if (!/[a-zA-Z]+/g.test(char)) {
      return;
    }

    // create a key/value pair using lowercase letter as key
    const charKey = char.toLowerCase();
    counter[charKey] = counter[charKey] ? ++counter[charKey] : 1;
  });

  // sort the result by key alphabetically
  return Object.fromEntries(Object.entries(counter).sort());
};
