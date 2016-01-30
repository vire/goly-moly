/* eslint "no-extend-native": [2, {"exceptions": ["Array"]}] */

Array.prototype.flatMap = function flatMap() {
  const tmp = [];
  this.forEach(arr => {
    arr.forEach(item => tmp.push(item));
  });
  return tmp;
};

Array.prototype.uniq = function uniq() {
  const tmp = [];
  const isPresent = (arr, item) => {
    let result;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === item[0] && arr[i][1] === item[1]) {
        result = true;
        break;
      }
    }
    return result;
  };

  this.forEach(item => {
    if (!isPresent(tmp, item)) {
      tmp.push(item);
    }
  });

  return tmp;
};

// contains is an alias for isInState
const filterAliveCells = (cells, contains) => cells.filter(cell => contains(cell));

// computation helper to get surrounding cells for the passed in cell
export const computeNeighboursForCell = cell => {
  const base = [-1, 0, 1];
  return base
    .map(i => base.map(j => [i, j]))
    .flatMap()
    .map(c => [c[0] + cell[0], c[1] + cell[1]])
    .filter(c => c[0] !== cell[0] || c[1] !== cell[1]);
};

// returns fn that encloses the passed state and accepts cell to be checked
// state.contains(cell)
export const isInState = state => cell => {
  return state.filter(c => cell[0] === c[0] && cell[1] === c[1]).length === 1;
};

// check if cell will survive the current tick
const evaluateCell = (cell, livingNeighbours) => {
  return livingNeighbours.length > 1 && livingNeighbours.length < 4 ? [cell] : [];
};

// reduce cell either to [] or [cell] or [cell, resurrected] or [resurrected]
export const reduceCell = (cell, state) => {
  const isCellInState = isInState(state); // state => cell => Boolean

  const neighbours = computeNeighboursForCell(cell);
  const livingNeighbours = neighbours.filter(n => isCellInState(n));

  const resurrectedNeighbours = neighbours
    .filter(n => filterAliveCells(computeNeighboursForCell(n), isCellInState).length === 3);

  return evaluateCell(cell, livingNeighbours)
    .concat(resurrectedNeighbours);
};
