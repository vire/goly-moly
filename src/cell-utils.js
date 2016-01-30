/* eslint "no-extend-native": [2, {"exceptions": ["Array"]}] */

Array.prototype.flatMap = function flatMap() {
  const tmp = [];
  this.forEach(arr => {
    arr.forEach(item => tmp.push(item));
  });
  return tmp;
};

export const computeNeighboursForCell = cell => {
  const base = [-1, 0, 1];
  return base
    .map(i => base.map(j => [i, j]))
    .flatMap()
    .map(c => [c[0] + cell[0], c[1] + cell[1]])
    .filter(c => c[0] !== cell[0] || c[1] !== cell[1]);
};

export const isInState = state => cell => {
  return state.filter(c => cell[0] === c[0] && cell[1] === c[1]).length === 1;
};
