export const initGridState = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
}

export const winningCombination = [
  [1, 2, 3], 
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

export const checkResult = (gridState) => {
  let endGame = false
  let winner = ''
  if (
    !!gridState[1] && !!gridState[2] && !!gridState[3] && 
    gridState[1] === gridState[2] && gridState[2] === gridState[3]
  ) {
    endGame = true;
    winner = gridState[1];
  } else if (
    !!gridState[4] && !!gridState[5] && !!gridState[6] &&
    gridState[4] === gridState[5] && gridState[5] === gridState[6]
  ) {
    endGame = true;
    winner = gridState[4];
  } else if (
    !!gridState[7] && !!gridState[8] && !!gridState[9] &&
    gridState[7] === gridState[8] && gridState[8] === gridState[9]
  ) {
    endGame = true;
    winner = gridState[7];
  } else if (
    !!gridState[1] && !!gridState[4] && !!gridState[7] &&
    gridState[1] === gridState[4] && gridState[4] === gridState[7]
  ) {
    endGame = true;
    winner = gridState[1];
  } else if (
    !!gridState[2] && !!gridState[5] && !!gridState[8] &&
    gridState[2] === gridState[5] && gridState[5] === gridState[8]
  ) {
    endGame = true;
    winner = gridState[2];
  } else if (
    !!gridState[3] && !!gridState[6] && !!gridState[9] &&
    gridState[3] === gridState[6] && gridState[6] === gridState[9]
  ) {
    endGame = true;
    winner = gridState[3];
  } else if (
    !!gridState[1] && !!gridState[5] && !!gridState[9] &&
    gridState[1] === gridState[5] && gridState[5] === gridState[9]
  ) {
    endGame = true;
    winner = gridState[1];
  } else if (
    !!gridState[3] && !!gridState[5] && !!gridState[7] &&
    gridState[3] === gridState[5] && gridState[5] === gridState[7]
  ) {
    endGame = true;
    winner = gridState[3];
  } else if (
    !!gridState[1] && !!gridState[2] && !!gridState[3] &&
    !!gridState[4] && !!gridState[5] && !!gridState[6] &&
    !!gridState[7] && !!gridState[8] && !!gridState[9]
  ) {
    endGame = true;
    winner = 'draw';
  }

  return [endGame, winner];
}
