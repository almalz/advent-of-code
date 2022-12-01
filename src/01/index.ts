type Elf = {
  index: number;
  payload: number;
};

export const parseInput = (input: string): Elf[] => {
  const itemGroups = input
    .split('\n\n')
    .map(stringGroup => stringGroup.split('\n').map(Number));

  const elfs: Elf[] = itemGroups.map((itemGroup, index) => {
    const payload = itemGroup.reduce((acc, curr) => acc + curr, 0);
    return { index, payload };
  });

  return elfs;
};

export const partOne = (input: string): number => {
  const elfs = parseInput(input);

  return Math.max(...elfs.map(({ payload }) => payload));
};

export const partTwo = (input: string): number => {
  const elfs = parseInput(input);

  const orderedPayloads = elfs
    .map(({ payload }) => payload)
    .sort((a, b) => b - a);

  return orderedPayloads.slice(0, 3).reduce((acc, curr) => acc + curr, 0);
};
