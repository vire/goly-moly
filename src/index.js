import { reduceCell } from './cell-utils';

// Array.prototype.fatMap and .uniq() are applied in `cell-utils`;
export const updateWorld = state => state.map(cell => reduceCell(cell, state)).flatMap().uniq();
