const partTwo = (lines: string[]) => {
  return lines.reduce((total, line, index) => {
    let count = 0;
    let gears;
    const gearRegex = /([*]+)/g;

    while ((gears = gearRegex.exec(line)) !== null) {
      const numbers: string[] = [];
      const numberRegex = /(\d+)/;
      const indexOfGear = gears.index;

      const left = line.substring(indexOfGear - 1, indexOfGear);
      const right = line.substring(indexOfGear + 1, indexOfGear + 2);
      const above =
        lines[index - 1]?.substring(indexOfGear - 1, indexOfGear + 2) || '';
      const below =
        lines[index + 1]?.substring(indexOfGear - 1, indexOfGear + 2) || '';

      if (numberRegex.test(left)) {
        const matches = line.substring(0, indexOfGear).matchAll(/(\d+)/g);

        if (matches) {
          const number = Array.from(matches).reverse()[0][0];
          numbers.push(number);
        }
      }

      if (numberRegex.test(right)) {
        const matches = line.substring(indexOfGear).match(numberRegex);

        if (matches) {
          const number = matches[0];
          numbers.push(number);
        }
      }

      if (numberRegex.test(above)) {
        let localInd = 1;

        while (
          indexOfGear - localInd >= 0 &&
          indexOfGear + 1 + localInd < lines[index - 1].length
        ) {
          const string = lines[index - 1]?.substring(
            indexOfGear - localInd,
            indexOfGear + 1 + localInd
          );

          const endOrStartRegex = /(?<=[^\d+])(\d+)(?=[^\d+])/g;
          const results = string.matchAll(endOrStartRegex);
          if (index === 119 && indexOfGear === 18) {
            console.log(string);
            console.log(Array.from(results));
          }

          if (Array.from(results).length) {
            break;
          }

          localInd += 1;
        }
      }

      if (numberRegex.test(below)) {
        let string = below;

        let localInd = 1;
        let results;
        const endOrStartRegex = /[^\d+](\d+)[^\d+]/g;

        while ((results = endOrStartRegex.exec(string)) === null) {
          if (
            indexOfGear - localInd <= 0 ||
            indexOfGear + 1 + localInd > line.length
          ) {
            break;
          }

          localInd += 1;
          string = lines[index + 1]?.substring(
            indexOfGear - localInd,
            indexOfGear + 1 + localInd
          );
        }

        const result = results?.[1] || string.match(/\d+/)?.[0];

        if (result) {
          numbers.push(result);
        }
      }

      if (numbers.length === 2) {
        count += numbers.reduce((t, n) => t * parseInt(n), 1);
      }
    }

    return total + count;
  }, 0);
};

const contents = await Bun.file(`${import.meta.dir}/input.txt`).text();
const lines = contents.split('\n');

const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.split('\n');

console.log('Part two:', partTwo(input));
console.log('Part two:', partTwo(lines));
