type Rucksack = string;
type Group = [Rucksack, Rucksack, Rucksack];

const itemScores = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const parseInput = (input: string): Rucksack[] => {
  return input.split('\n');
};

const getSharedItem = <T extends unknown>(arrays: T[][]): T => {
  return arrays.reduce((acc, curr) => acc.filter(arr => curr.includes(arr)))[0];
};

const formGroups = (rucksacks: Rucksack[]): Rucksack[][] =>
  rucksacks.reduce((acc, curr, index) => {
    return index % 3 === 0
      ? [...acc, [curr]]
      : [...acc.slice(0, -1), [...acc.slice(-1)[0], curr]];
  }, []);

export const partOne = (input: string): number => {
  const rucksacks = parseInput(input).map(rucksack => [
    rucksack.substring(0, rucksack.length / 2),
    rucksack.substring(rucksack.length / 2, rucksack.length),
  ]);

  return rucksacks.reduce((acc, curr) => {
    return acc + itemScores.indexOf(getSharedItem(curr.map(a => [...a])));
  }, 0);
};

export const partTwo = (input: string): number => {
  const groups = formGroups(parseInput(input)) as Group[];
  const score = groups.reduce((acc, curr) => {
    return acc + itemScores.indexOf(getSharedItem(curr.map(a => [...a])));
  }, 0);

  return score;
};
