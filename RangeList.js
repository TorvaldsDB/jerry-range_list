class RangeList {
  #isValidRange(range) {
    return Array.isArray(range) && range.length === 2 && typeof range[0] === 'number' && typeof range[1] === 'number' && range[0] <= range[1];
  }

  #mergeAdjacentRanges(index) {
    if (index > 0) {
      const [prevStart, prevEnd] = this.ranges[index - 1];
      const [currentStart, currentEnd] = this.ranges[index];

      if (prevEnd >= currentStart) {
        this.ranges[index - 1] = [prevStart, Math.max(prevEnd, currentEnd)];
        this.ranges.splice(index, 1);
      }
    }

    if (index < this.ranges.length - 1) {
      const [currentStart, currentEnd] = this.ranges[index];
      const [nextStart, nextEnd] = this.ranges[index + 1];

      if (currentEnd >= nextStart) {
        this.ranges[index] = [currentStart, Math.max(currentEnd, nextEnd)];
        this.ranges.splice(index + 1, 1);
      }
    }
  }
  
  constructor() {
    this.ranges = [];
  }

  add(range) {
    if (!this.#isValidRange(range)) {
      console.error('Invalid range format. Please provide a valid range.');
      return;
    }

    const [start, end] = range;
    let inserted = false;

    for (let i = 0; i < this.ranges.length; i++) {
      const [currentStart, currentEnd] = this.ranges[i];

      if (end < currentStart) {
        this.ranges.splice(i, 0, range);
        inserted = true;
        break;
      }

      if (start > currentEnd) {
        continue;
      }

      this.ranges[i] = [Math.min(start, currentStart), Math.max(end, currentEnd)];
      inserted = true;
      this.#mergeAdjacentRanges(i);
      break;
    }

    if (!inserted) {
      this.ranges.push(range);
      this.#mergeAdjacentRanges(this.ranges.length - 1);
    }
  }

  remove(range) {
    if (!this.#isValidRange(range)) {
      console.error('Invalid range format. Please provide a valid range.');
      return;
    }

    const [start, end] = range;

    for (let i = 0; i < this.ranges.length; i++) {
      const [currentStart, currentEnd] = this.ranges[i];

      if (end < currentStart) {
        break;
      }

      if (start > currentEnd) {
        continue;
      }

      if (start <= currentStart && end >= currentEnd) {
        this.ranges.splice(i, 1);
        i--;
      } else if (start <= currentStart) {
        this.ranges[i] = [end, currentEnd];
      } else if (end >= currentEnd) {
        this.ranges[i] = [currentStart, start];
      } else {
        this.ranges.splice(i, 1, [currentStart, start], [end, currentEnd]);
        i++;
      }
    }
  }

  toString() {
    return this.ranges.map(range => `[${range[0]}, ${range[1]})`).join(' ');
  }
}

export default RangeList;
