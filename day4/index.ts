const partOne = (input: string) =>
  input
    .split("\n")
    .map((row) => row.split(""))
    .reduce((count, row, idx, array) => {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === "X") {
          if (row[i + 1] === "M" && row[i + 2] === "A" && row[i + 3] === "S") {
            count++;
          }

          if (row[i - 1] === "M" && row[i - 2] === "A" && row[i - 3] === "S") {
            count++;
          }

          if (
            array[idx + 1]?.[i] === "M" &&
            array[idx + 2]?.[i] === "A" &&
            array[idx + 3]?.[i] === "S"
          ) {
            count++;
          }

          if (
            array[idx - 1]?.[i] === "M" &&
            array[idx - 2]?.[i] === "A" &&
            array[idx - 3]?.[i] === "S"
          ) {
            count++;
          }

          if (
            array[idx + 1]?.[i + 1] === "M" &&
            array[idx + 2]?.[i + 2] === "A" &&
            array[idx + 3]?.[i + 3] === "S"
          ) {
            count++;
          }

          if (
            array[idx + 1]?.[i - 1] === "M" &&
            array[idx + 2]?.[i - 2] === "A" &&
            array[idx + 3]?.[i - 3] === "S"
          ) {
            count++;
          }

          if (
            array[idx - 1]?.[i - 1] === "M" &&
            array[idx - 2]?.[i - 2] === "A" &&
            array[idx - 3]?.[i - 3] === "S"
          ) {
            count++;
          }

          if (
            array[idx - 1]?.[i + 1] === "M" &&
            array[idx - 2]?.[i + 2] === "A" &&
            array[idx - 3]?.[i + 3] === "S"
          ) {
            count++;
          }
        }
      }

      return count;
    }, 0);

const partTwo = (input: string) =>
  input
    .split("\n")
    .map((row) => row.split(""))
    .reduce((count, row, idx, array) => {
      for (let i = 0; i < row.length; i++) {
        if (
          ((row[i] === "M" && array[idx + 2]?.[i + 2] === "S") ||
            (row[i] === "S" && array[idx + 2]?.[i + 2] === "M")) &&
          array[idx + 1]?.[i + 1] === "A" &&
          ((row[i + 2] === "M" && array[idx + 2]?.[i] === "S") ||
            (row[i + 2] === "S" && array[idx + 2]?.[i] === "M"))
        ) {
          count++;
        }
      }

      return count;
    }, 0);

const file = Bun.file("day4/input.txt");
const input = await file.text();

console.log(partOne(input));
console.log(partTwo(input));
