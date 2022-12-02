type Shape = 'rock' | 'paper' | 'scissors';
type MyInput = 'X' | 'Y' | 'Z';
type OpponentInput = 'A' | 'B' | 'C';

const opponentShapes: Record<OpponentInput, Shape> = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
};

const myShapes: Record<MyInput, Shape> = {
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

type Round = [OpponentInput, MyInput];

type Result = 'win' | 'lose' | 'draw';

const pointsByShape: Record<Shape, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const outcomeScore: Record<Result, number> = {
  win: 6,
  draw: 3,
  lose: 0,
};

const shapeWinAgainst: Record<Shape, Shape> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

export const parseInput = (input: string): Round[] =>
  input.split('\n').map(round => round.split(' ')) as Round[];

export const partOne = (input: string): number => {
  const rounds = parseInput(input);

  return rounds.reduce((acc, [opponent, me]) => {
    const roundScore =
      myShapes[me] === opponentShapes[opponent]
        ? outcomeScore['draw']
        : shapeWinAgainst[myShapes[me]] === opponentShapes[opponent]
        ? outcomeScore['win']
        : outcomeScore['lose'];

    return roundScore + pointsByShape[myShapes[me]] + acc;
  }, 0);
};

const codeResult: Record<MyInput, Result> = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

export const partTwo = (input: string): number => {
  const rounds = parseInput(input);
  return rounds.reduce((acc, [opponent, me]) => {
    const goal = codeResult[me];
    const roundScore = outcomeScore[goal];

    const myShape =
      goal === 'draw'
        ? opponentShapes[opponent]
        : goal === 'lose'
        ? shapeWinAgainst[opponentShapes[opponent]]
        : shapeWinAgainst[shapeWinAgainst[opponentShapes[opponent]]];

    const shapeScore = pointsByShape[myShape];

    return shapeScore + roundScore + acc;
  }, 0);
};
