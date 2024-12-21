const partOne = (input: string) =>
  input.matchAll(/mul\((\d+),(\d+)\)/g).reduce((total, match) => {
    total += parseInt(match[1]) * parseInt(match[2]);
    return total;
  }, 0);

const partTwo = (input: string) => {
  return input
    .replace(/\n/g, "")
    .replace(/don't\(\)(.*?)(?:do\(\)|$)/g, "")
    .matchAll(/mul\((\d+),(\d+)\)/g)
    .reduce((total, match) => {
      total += parseInt(match[1]) * parseInt(match[2]);
      return total;
    }, 0);
};

const file = Bun.file("day3/input.txt");
const input = await file.text();

console.log(partOne(input));
console.log(partTwo(input));
