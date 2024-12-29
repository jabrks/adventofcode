const countMidpoints = (
  input: string,
  filterFn: (
    allUpdates: string[][]
  ) => (sortedUpdate: string[], index: number) => boolean
) => {
  const [rules, updates] = input.split("\n\n");

  const ruleMap = rules
    .split("\n")
    .reduce<Record<string, string[]>>((map, rule) => {
      const [key, value] = rule.split("|");
      map[key] ??= [];
      map[key].push(value);
      return map;
    }, {});

  const allUpdates = updates.split("\n").map((update) => update.split(","));
  const sortedUpdates = allUpdates.map((update) =>
    update.toSorted((a, b) => (ruleMap[a] && ruleMap[a].includes(b) ? -1 : 0))
  );
  const updatesToCount = sortedUpdates.filter(filterFn(allUpdates));

  return updatesToCount.reduce((count, update) => {
    const midpoint = update[Math.floor(update.length / 2)];
    return count + parseInt(midpoint);
  }, 0);
};

const partOne = (input: string) =>
  countMidpoints(
    input,
    (allUpdates) => (sortedUpdate, index) =>
      sortedUpdate.every((page, idx) => page === allUpdates[index][idx])
  );

const partTwo = (input: string) =>
  countMidpoints(
    input,
    (allUpdates) => (sortedUpdate, index) =>
      sortedUpdate.some((page, idx) => page !== allUpdates[index][idx])
  );

const file = Bun.file("day5/input.txt");
const input = await file.text();

console.log(partOne(input));
console.log(partTwo(input));
