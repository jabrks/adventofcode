const checkValues = (array: number[], ...offsets: number[]) => {
  return offsets.some((offset) =>
    array.every((value, index, arr) => {
      if (!arr[index + offset]) return true;
      const diff = Math.abs(value - arr[index + offset]);
      return value < arr[index + offset] && diff <= 3 && diff >= 1;
    })
  );
};

const partOne = (arr: number[][]) => {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (checkValues(arr[i], -1, 1)) {
      count++;
    }
  }

  return count;
};

const partTwo = (arr: number[][]) => {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    const isSafe = arr[i].some((_, idx) => {
      const report = [...arr[i]];
      report.splice(idx, 1);

      return checkValues(report, -1, 1);
    });

    if (isSafe) {
      count++;
    }
  }

  return count;
};

const file = Bun.file("day2/input.txt");
const input = await file.text();
const arr = input
  .split("\n")
  .map((row) => row.split(" ").map((int) => parseInt(int)));

console.log(partOne(arr));
console.log(partTwo(arr));
