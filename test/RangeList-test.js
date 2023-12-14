import { expect } from 'chai';
import RangeList from '../RangeList'; 

/**
 * RangeList.js
 * 
 * This file contains the implementation of the RangeList class, which represents a list of ranges.
 * A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
 * A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
 *
 * The RangeList class provides methods for adding and removing ranges, as well as converting the list
 * of ranges to a string representation.
 *
 * Example Usage:
 * const rl = new RangeList(); rl.toString(); // Should be ""
 * rl.add([1, 5]);
 * console.log(rl.toString()); // Should be: "[1, 5)"
 * rl.add([10, 20]);
 * console.log(rl.toString()); // Should be: "[1, 5) [10, 20)"
 * rl.add([20, 20]);
 * console.log(rl.toString()); // Should be: "[1, 5) [10, 20)"
 * rl.add([20, 21]);
 * console.log(rl.toString()); // Should be: "[1, 5) [10, 21)"
 * rl.add([2, 4]);
 * console.log(rl.toString()); // Should be: "[1, 5) [10, 21)"
 * rl.add([3, 8]);
 * console.log(rl.toString()); // Should be: "[1, 8) [10, 21)"
 * rl.remove([10, 10]);
 * console.log(rl.toString()); // Should be: "[1, 8) [10, 21)"
 * rl.remove([10, 11]);
 * console.log(rl.toString()); // Should be: "[1, 8) [11, 21)"
 * rl.remove([15, 17]);
 * console.log(rl.toString()); // Should be: "[1, 8) [11, 15) [17, 21)"
 * rl.remove([3, 19]);
 * console.log(rl.toString()); // Should be: "[1, 3) [19, 21)"
 */

describe('RangeList', () => {
  it('should add ranges correctly', () => {
    const rl = new RangeList();

    expect(rl.toString()).to.equal('');
    
    rl.add([1, 5]);
    expect(rl.toString()).to.equal('[1, 5)');

    rl.add([10, 20]);
    expect(rl.toString()).to.equal('[1, 5) [10, 20)');

    rl.add([20, 20]);
    expect(rl.toString()).to.equal('[1, 5) [10, 20)');

    rl.add([20, 21]);
    expect(rl.toString()).to.equal('[1, 5) [10, 21)');

    rl.add([2, 4]);
    expect(rl.toString()).to.equal('[1, 5) [10, 21)');
    
    rl.add([3, 8]);
    expect(rl.toString()).to.equal('[1, 8) [10, 21)');
  });

  it('should remove ranges correctly', () => {
    const rl = new RangeList();

    rl.add([1, 5]);
    rl.add([10, 20]);
    rl.add([20, 20]);
    rl.add([20, 21]);
    rl.add([2, 4]);
    rl.add([3, 8]);

    rl.remove([10, 10]);
    expect(rl.toString()).to.equal('[1, 8) [10, 21)');

    rl.remove([10, 11]);
    expect(rl.toString()).to.equal('[1, 8) [11, 21)');

    rl.remove([15, 17]);
    expect(rl.toString()).to.equal('[1, 8) [11, 15) [17, 21)');
    
    rl.remove([3, 19]);
    expect(rl.toString()).to.equal('[1, 3) [19, 21)');
  });

  it('should handle invalid range format during add', () => {
    const rl = new RangeList();
    rl.add([1, 5]);

    // Attempt to add an invalid range
    rl.add([5, 3]);
    expect(rl.toString()).to.equal('[1, 5)');

    // Attempt to add an integer
    rl.add(1);
    expect(rl.toString()).to.equal('[1, 5)');

    // Attempt to add an array but not [number, number]
    rl.add(['1', '3']);
    expect(rl.toString()).to.equal('[1, 5)');
  });

  it('should handle invalid range format during remove', () => {
    const rl = new RangeList();
    rl.add([1, 5]);

    // Attempt to remove an invalid range
    rl.remove([5, 3]);
    expect(rl.toString()).to.equal('[1, 5)');

    // Attempt to remove an integer
    rl.remove(1);
    expect(rl.toString()).to.equal('[1, 5)');

    // Attempt to remove an array but not [number, number]
    rl.remove(['1', '3']);
    expect(rl.toString()).to.equal('[1, 5)');
  });
});
