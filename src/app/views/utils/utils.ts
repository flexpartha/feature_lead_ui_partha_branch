export const utils = {
  splitFirstOccurrence(str, separator) {
    const [first, ...rest] = str.split(separator);
    const last = rest.join(separator);
    return { first, last };
  },
};
