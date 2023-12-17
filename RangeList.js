class RangeList {
  // Checks if the given range is valid
  #isValidRange(range) {
    return (
      Array.isArray(range) &&
      range.length === 2 &&
      typeof range[0] === "number" &&
      typeof range[1] === "number" &&
      range[0] <= range[1]
    );
  }

  // Merges adjacent ranges at the specified index
  #mergeAdjacentRanges(index) {
    // Merge with the previous range if they are adjacent or overlapping
    if (index > 0) {
      const [prevStart, prevEnd] = this.ranges[index - 1];
      const [currentStart, currentEnd] = this.ranges[index];

      if (prevEnd >= currentStart) {
        this.ranges[index - 1] = [prevStart, Math.max(prevEnd, currentEnd)];
        this.ranges.splice(index, 1);
      }
    }

    // Merge with the next range if they are adjacent or overlapping
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
    // Initialize an empty array to store ranges
    this.ranges = [];
  }

  // Adds a range to the list
  add(range) {
    if (!this.#isValidRange(range)) {
      console.error("Invalid range format. Please provide a valid range.");
      return;
    }

    const [start, end] = range;
    let inserted = false;

    // Iterate through existing ranges to find the correct position for insertion
    for (let i = 0; i < this.ranges.length; i++) {
      const [currentStart, currentEnd] = this.ranges[i];

      // Insert before the current range if the new range ends before the current range starts
      if (end < currentStart) {
        this.ranges.splice(i, 0, range);
        inserted = true;
        break;
      }

      // If there is an overlap or adjacency, merge the ranges
      if (start <= currentEnd) {
        this.ranges[i] = [
          Math.min(start, currentStart),
          Math.max(end, currentEnd),
        ];
        inserted = true;
        this.#mergeAdjacentRanges(i);
        break;
      }
    }

    // If the range was not inserted earlier, add it at the end and merge
    if (!inserted) {
      this.ranges.push(range);
      this.#mergeAdjacentRanges(this.ranges.length - 1);
    }
  }

  // Removes a range from the list
  remove(range) {
    if (!this.#isValidRange(range)) {
      console.error("Invalid range format. Please provide a valid range.");
      return;
    }

    const [start, end] = range;

    // Iterate through existing ranges to find and remove overlapping or adjacent ranges
    for (let i = 0; i < this.ranges.length; i++) {
      const [currentStart, currentEnd] = this.ranges[i];

      if (end < currentStart) {
        break;
      }

      if (start > currentEnd) {
        continue;
      }

      if (start <= currentStart && end >= currentEnd) {
        // Completely remove the current range
        this.ranges.splice(i, 1);
        i--; // Adjust index since an element is removed
      } else if (start <= currentStart) {
        // Trim the start of the current range
        this.ranges[i] = [end, currentEnd];
      } else if (end >= currentEnd) {
        // Trim the end of the current range
        this.ranges[i] = [currentStart, start];
      } else {
        // Split the current range into two parts
        this.ranges.splice(i, 1, [currentStart, start], [end, currentEnd]);
        i++; // Adjust index since an element is added
      }
    }
  }

  // Converts the list of ranges to a string
  toString() {
    return this.ranges.map((range) => `[${range[0]}, ${range[1]})`).join(" ");
  }
}

export default RangeList;
