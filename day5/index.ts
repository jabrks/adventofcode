const getLowestNumberForSeeds = (rest: string[], seeds: string[]) => {
  const maps = rest.map((line) => {
    return line
      .split("\n")
      .slice(1)
      .map((line) => line.split(" ").map((num) => parseInt(num)));
  });

  return seeds
    .map((seed) => {
      return maps.reduce((num, map) => {
        for (const [destination, source, length] of map) {
          if (source <= num && num <= source + length) {
            return num - source + destination;
          }
        }

        return num;
      }, parseInt(seed));
    })
    .sort((a, b) => a - b)[0];
};

const partOne = (lines: string[]) => {
  const [first, ...rest] = lines;
  const seeds = first.replace("seeds: ", "").split(" ");
  return getLowestNumberForSeeds(rest, seeds);
};

const partTwo = (lines: string[]) => {
  const [first, ...rest] = lines;
  const seeds = first
    .replace("seeds: ", "")
    .split(" ")
    .flatMap((seed, index, array) => {
      if (index % 2 === 0) {
        const range = array[index + 1];
        return Array.from(new Array(parseInt(range))).map(
          (_, i) => `${parseInt(seed) + i}`,
        );
      }
      return [];
    });

  return getLowestNumberForSeeds(rest, seeds);
};

const contents = await Bun.file(`${import.meta.dir}/input.txt`).text();
const lines = contents.split("\n\n");

const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split("\n\n");

console.log("Part one:", partOne(lines));
console.log("Part two:", partTwo(lines));
