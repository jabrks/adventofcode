const partOne = (lines: string[]) => {
  return lines.reduce((sum, line) => {
    const [winning, numbers] = line
      .split(/\s+/)
      .slice(2)
      .join(' ')
      .split(' | ')
      .map((scores) => scores.split(' '));

    return (
      sum +
      numbers.reduce(
        (total, number) =>
          winning.includes(number) ? (total ? total * 2 : 1) : total,
        0
      )
    );
  }, 0);
};

const getWinningNumbers = (lines: string[], line: string) => {
  const cardNumber = parseInt(line.match(/Card\s+(\d+):/)?.[1] || '');

  const [winning, numbers] = line
    .split(/\s+/)
    .slice(2)
    .join(' ')
    .split(' | ')
    .map((scores) => scores.split(' '));

  let total = 1;

  const winningNumbers = numbers.filter((number) => winning.includes(number));

  for (let i = 0; i < winningNumbers.length; i++) {
    total += getWinningNumbers(lines, lines[cardNumber + i]);
  }

  return total;
};

const partTwo = (lines: string[]) => {
  return lines.reduce((sum, line) => {
    return sum + getWinningNumbers(lines, line);
  }, 0);
};

const contents = await Bun.file(`${import.meta.dir}/input.txt`).text();
const lines = contents.split('\n');
console.log('Part one:', partOne(lines));
console.log('Part two:', partTwo(lines));
