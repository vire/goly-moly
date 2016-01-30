import chai from 'chai';
import {
  computeNeighboursForCell,
  isInState,
  reduceCell,
} from '../src/cell-utils';

import { updateWorld } from '../src';

const expect = chai.expect;


describe('GolyMoly', () => {
  describe('helper function', () => {
    it('`computeNeighboursForCell` should return neighbours for a cell', () => {
      const expected = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      expect(computeNeighboursForCell([0, 0])).to.deep.equal(expected);
    });

    it('`isInState` should return predicateFn', () => {
      const sampleState = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 0],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      const predicateFn = isInState(sampleState);
      expect(predicateFn([0, 0])).to.equal(true);
      expect(predicateFn([-2, 0])).to.equal(false);
    });
  });

  describe('cell reduction', () => {
    it('should preserve ALIVE cell with 2 neighbours', () => {
      const expected = [[-1, 0], [-1, 1]];
      const actual = reduceCell([-1, 0], [[-1, 0], [0, 1], [0, 0]]);
      expect(actual).to.deep.equal(expected);
    });

    it('should resurrect DEAD cell with 3 neighbours', () => {
      const expected = [[0, 0], [0, -1], [0, 1]];
      const actual = reduceCell([0, 0], [[-1, 0], [0, 0], [1, 0]]);
      expect(actual).to.deep.equal(expected);
    });

    it('should kill ALIVE cell with 1 or 0 neighbours', () => {
      const state = [[0, 0], [1, 0]];
      const expected = [];
      const actual = reduceCell([0, 0], state);
      expect(actual).to.deep.equal(expected);
    });

    it('should kill ALIVE cell with 4 and more neighbours', () => {
      const state = [
        [-1, -1],
        [-1, 0],
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ];
      const expected = [
        [-1, 0],
        [-1, 1],
        [1, 0],
        [1, 1],
      ];

      const actual = reduceCell([0, 0], state);
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('updateWorld', () => {
    it('should return identity with empty state', () => {
      const initialState = [];
      const expectedState = [];
      const actual = updateWorld(initialState);
      expect(actual).to.deep.equal(expectedState);
    });

    it('should return a new state by applying reduceCell to all cells', () => {
      const initialState = [
        [-1, -1],
        [-1, 0],
        [0, 0],
        [0, -1],
        [1, 0],
        [1, -1],
      ];
      const expectedState = [
        [-1, -1],
        [-1, 0],
        [0, -2],
        [0, 1],
        [1, -1],
        [1, 0],
      ];

      const actual = updateWorld(initialState);
      expect(actual.length).to.equal(expectedState.length);
      expect(actual).to.deep.equal(expectedState);
    });
  });
});
