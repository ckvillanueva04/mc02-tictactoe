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

export const checkNextMove = (gridState, player) => {
  //  [1, 2, 3]
  if (gridState[1] === player && gridState[2] === player && !gridState[3]) {
    return 3
  } else if (gridState[2] === player && gridState[3] === player && !gridState[1]) {
    return 1
  } else if (gridState[1] === player && gridState[3] === player && !gridState[2]) {
    return 2
  } 
  //   [4, 5, 6]
  else if (gridState[4] === player && gridState[5] === player && !gridState[6]) {
    return 6
  } else if (gridState[4] === player && gridState[6] === player && !gridState[5]) {
    return 5
  } else if (gridState[5] === player && gridState[6] === player && !gridState[4]) {
    return 4
  }
  // [7, 8, 9]
  else if (gridState[7] === player && gridState[8] === player && !gridState[9]) {
    return 9
  } else if (gridState[7] === player && gridState[9] === player && !gridState[8]) {
    return 8
  } else if (gridState[8] === player && gridState[9] === player && !gridState[7]) {
    return 7
  }
  // [1, 4, 7]
  else if (gridState[1] === player && gridState[4] === player && !gridState[7]) {
    return 7
  } else if (gridState[1] === player && gridState[7] === player && !gridState[4]) {
    return 4
  } else if (gridState[4] === player && gridState[7] === player && !gridState[1]) {
    return 1
  }
  // [2, 5, 8]
  else if (gridState[2] === player && gridState[5] === player && !gridState[8]) {
    return 8
  } else if (gridState[2] === player && gridState[8] === player && !gridState[5]) {
    return 5
  } else if (gridState[5] === player && gridState[8] === player && !gridState[2]) {
    return 2
  }
  // [3, 6, 9]
  else if (gridState[3] === player && gridState[6] === player && !gridState[9]) {
    return 9
  } else if (gridState[3] === player && gridState[9] === player && !gridState[6]) {
    return 6
  } else if (gridState[6] === player && gridState[9] === player && !gridState[3]) {
    return 3
  }
  // [1, 5, 9]
  else if (gridState[1] === player && gridState[5] === player && !gridState[9]) {
    return 9
  } else if (gridState[1] === player && gridState[9] === player && !gridState[5]) {
    return 5
  } else if (gridState[5] === player && gridState[9] === player && !gridState[1]) {
    return 1
  }
  // [3, 5, 7]
  else if (gridState[3] === player && gridState[5] === player && !gridState[7]) {
    return 7
  } else if (gridState[3] === player && gridState[7] === player && !gridState[5]) {
    return 5
  } else if (gridState[5] === player && gridState[7] === player && !gridState[3]) {
    return 3
  }
  return undefined;
}