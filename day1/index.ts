const partOne = async (lines: string[]) => {
  return lines.reduce((total, line) => {
    const digits = line.replaceAll(/[^\d]/g, "");
    const firstAndLast =
      digits.substring(0, 1) + digits.substring(digits.length - 1);
    return (total += parseInt(firstAndLast));
  }, 0);
};

const partTwo = async (lines: string[]) => {
  return lines.reduce((total, line) => {
    const digits = line
      .replaceAll(/(?=(one|two|three|four|five|six|seven|eight|nine))/g, "$1")
      .replaceAll("one", "1")
      .replaceAll("two", "2")
      .replaceAll("three", "3")
      .replaceAll("four", "4")
      .replaceAll("five", "5")
      .replaceAll("six", "6")
      .replaceAll("seven", "7")
      .replaceAll("eight", "8")
      .replaceAll("nine", "9")
      .replaceAll(/[^\d]/g, "");
    const firstAndLast =
      digits.substring(0, 1) + digits.substring(digits.length - 1);
    return (total += parseInt(firstAndLast));
  }, 0);
};

const contents = await Bun.file(`${import.meta.dir}/input.txt`).text();
const lines = contents.split("\n");
console.log("Part one:", await partOne(lines));
console.log("Part two:", await partTwo(lines));
