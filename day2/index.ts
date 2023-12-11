const getCubesOfColour = (cubes: string, colour: string) =>
  [...cubes.matchAll(new RegExp(`(, )?(\\d+) ${colour}`, 'g'))]
    .flatMap((matches) => parseInt(matches[2]))
    .sort((a, b) => a - b);

const partOne = (lines: string[]) => {
  return lines.reduce((total, line) => {
    const [, id, results] = line.match(/Game (.*): (.*)/) || [];
    const reds = getCubesOfColour(results, 'red');
    const greens = getCubesOfColour(results, 'green');
    const blues = getCubesOfColour(results, 'blue');

    const isPossible =
      reds[reds.length - 1] <= 12 &&
      greens[greens.length - 1] <= 13 &&
      blues[blues.length - 1] <= 14;

    return isPossible ? total + parseInt(id) : total;
  }, 0);
};

const partTwo = (lines: string[]) => {
  return lines.reduce((total, line) => {
    const [, , results] = line.match(/Game (.*): (.*)/) || [];
    const reds = getCubesOfColour(results, 'red');
    const greens = getCubesOfColour(results, 'green');
    const blues = getCubesOfColour(results, 'blue');

    const power =
      reds[reds.length - 1] *
      greens[greens.length - 1] *
      blues[blues.length - 1];

    return total + power;
  }, 0);
};

const contents = await Bun.file(`${import.meta.dir}/input.txt`).text();
const lines = contents.split('\n');
console.log('Part one:', partOne(lines));
console.log('Part two:', partTwo(lines));
