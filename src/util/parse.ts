export function parseOptions(input: string) {
  const parsed = input.trim().split(",");
  if (parsed.every((item) => item.length > 0)) {
    return parsed;
  }
  return undefined;
}

export function parseOptionsPrices(input: string) {
  const parsed = input.trim().split(",");
  const parsedNumbers = parsed.map((item) => parseInt(item));
  const isValidPrices = parsedNumbers.every((item, i) => {
    return item.toString().length === parsed[i].length;
  });
  if (isValidPrices) {
    return parsedNumbers;
  }
  return undefined;
}
