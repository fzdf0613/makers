export function parseOptions(input: string) {
  const parsed = input.replace(/\s/g, "").split(",");
  if (parsed.every((item) => item.length > 0)) {
    return parsed;
  }
  return undefined;
}

export function parseOptionsPrices(input: string) {
  const parsed = input.replace(/\s/g, "").split(",");
  const parsedNumbers = parsed.map((item) => parseInt(item));
  if (
    parsedNumbers.every((item, i) => {
      item.toString().length === parsed[i].length;
    })
  ) {
    return parsedNumbers;
  }
  return undefined;
}
