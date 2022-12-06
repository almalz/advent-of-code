type Section = {
  from: number;
  to: number;
};

const inludesWhole = ([firstSection, secondSection]: [Section, Section]) =>
  (firstSection.from <= secondSection.from &&
    firstSection.to >= secondSection.to) ||
  (firstSection.from >= secondSection.from &&
    firstSection.to <= secondSection.to);

const overlap = ([firstSection, secondSection]: [Section, Section]) =>
  firstSection.from <= secondSection.to &&
  firstSection.to >= secondSection.from;

export const parseInput = (input: string) =>
  input.split('\n').map(pair =>
    pair.split(',').map(
      section =>
        ({
          from: Number(section.split('-')[0]),
          to: Number(section.split('-')[1]),
        } as Section),
    ),
  );

export const partOne = (input: string): number => {
  const data = parseInput(input);
  return data.reduce(
    (acc, curr) => (inludesWhole([curr[0], curr[1]]) ? (acc += 1) : acc),
    0,
  );
};

export const partTwo = (input: string): number => {
  const data = parseInput(input);
  return data.reduce(
    (acc, curr) => (overlap([curr[0], curr[1]]) ? (acc += 1) : acc),
    0,
  );
};
