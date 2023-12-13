const partOne = (lines: string[]) => {
  return lines.reduce((total, line, index) => {
    let count = 0;
    let numbers;
    const numberRegex = /([\d]+)/g;

    while ((numbers = numberRegex.exec(line)) !== null) {
      const number = numbers[0];
      const indexOfNum = numbers.index;
      const lastIndexOfNum = indexOfNum + number.length;
      const left = line.substring(indexOfNum - 1, indexOfNum);
      const right = line.substring(lastIndexOfNum, lastIndexOfNum + 1);
      const above =
        lines[index - 1]?.substring(indexOfNum - 1, lastIndexOfNum + 1) || "";
      const below =
        lines[index + 1]?.substring(indexOfNum - 1, lastIndexOfNum + 1) || "";

      if (/[^.\d]/.test(left + right + above + below)) {
        count += parseInt(number);
      }
    }

    return total + count;
  }, 0);
};

const getLineWithNumbers = (
  line: string,
  start: number,
  end: number,
): string => {
  const completeLine = line?.substring(start, end) || "";

  if (/^\d/.test(completeLine) && start >= 0) {
    return getLineWithNumbers(line, start - 1, end);
  }

  if (/\d$/.test(completeLine) && end <= line.length) {
    return getLineWithNumbers(line, start, end + 1);
  }

  return completeLine;
};

const partTwo = (lines: string[]) => {
  return lines.reduce((total, line, index) => {
    let gears;
    const gearRegex = /([*]+)/g;
    let count = 0;

    while ((gears = gearRegex.exec(line)) !== null) {
      const indexOfGear = gears.index;

      const left = getLineWithNumbers(line, indexOfGear - 1, indexOfGear);
      const right = getLineWithNumbers(line, indexOfGear + 1, indexOfGear + 2);
      const above = getLineWithNumbers(
        lines[index - 1],
        indexOfGear - 1,
        indexOfGear + 2,
      );
      const below = getLineWithNumbers(
        lines[index + 1],
        indexOfGear - 1,
        indexOfGear + 2,
      );

      const adjacent = left + right + above + below;
      const numbers = Array.from(adjacent.matchAll(/\d+/g)).flat();

      if (numbers.length === 2) {
        count += numbers.reduce((t, n) => t * parseInt(n), 1);
      }
    }

    return total + count;
  }, 0);
};

const contents = await Bun.file(`${import.meta.dir}/input.txt`).text();
const lines = contents.split("\n");
console.log("Part one:", partOne(lines));
console.log("Part two:", partTwo(lines));
