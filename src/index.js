import {
  isInState,
  computeNeighboursForCell,
} from './cell-utils';

export const filterAliveCells = (cells, predicate) => cells.filter(cell => predicate(cell));

export const reduceCell = (cell, state) => {
  const isCellInState = isInState(state); // state => cell => Boolean

  const neighbours = computeNeighboursForCell(cell);
  const livingNeighbours = neighbours.filter(n => isCellInState(n));

  const resurrectedNeighbours = neighbours
    .filter(n => filterAliveCells(computeNeighboursForCell(n), isCellInState).length === 3);
  const evaluateCell = (_cell, alive) => alive.length > 1 && alive.length < 4 ? [_cell] : [];
  return evaluateCell(cell, livingNeighbours).concat(resurrectedNeighbours);
};
