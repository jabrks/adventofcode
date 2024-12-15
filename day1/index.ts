const partOne = (left: number[], right: number[]) => {
  let total = 0;

  for (let i = 0; i < left.length; i++) {
    total += Math.abs(right[i] - left[i]);
  }

  return total;
};

const partTwo = (left: number[], right: number[]) => {
  let total = 0;

  for (let i = 0; i < left.length; i++) {
    total += left[i] * right.filter((num) => num === left[i]).length;
  }

  return total;
};

const file = Bun.file("day1/input.txt");
const input = await file.text();

const arr = input
  .replaceAll(/\n|   /g, " ")
  .split(" ")
  .map((int) => parseInt(int));

const left = arr.filter((_, i) => i % 2 === 0).sort();
const right = arr.filter((_, i) => i % 2 !== 0).sort();

console.log(partOne(left, right));
console.log(partTwo(left, right));
