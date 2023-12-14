# @torvalds/range_list

A JavaScript package that provides a RangeList class for managing ranges.

The `RangeList` class represents a list of ranges in JavaScript. A range is defined by a pair of integers, for example, [1, 5), which includes integers 1, 2, 3, and 4.

## Installation

```bash
npm install @torvalds/range_list
```

## Usage

```javascript
import RangeList from '@torvalds/range_list';

const rl = new RangeList();
rl.add([1, 5]);
rl.add([10, 20]);
console.log(rl.toString()); // Should be: "[1, 5) [10, 20)"
rl.remove([15, 17]);
console.log(rl.toString()); // Should be: "[1, 5) [10, 15) [17, 20)"
```

## API

`RangeList`

`constructor()`

Creates a new instance of the RangeList.

`add(range: [number, number])`

Adds a range to the list.

`remove(range: [number, number])`

Removes a range from the list.

`toString(): string`

Converts the list of ranges to a string representation.

## Contributing

[Torvalds](https://github.com/TorvaldsDB)

## TODO

- Add TypeScript Support