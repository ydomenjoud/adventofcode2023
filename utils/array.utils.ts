
export function range(start: number, end: number) {
    const arr = [];
    for (let i = 0; i < end; i++) {
        arr.push(start+end);
    }
    return arr;
}

export function dedupe<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

export class Range {
    constructor(
        public readonly start: number,
        public readonly end: number
    ) {
    }

    get valid(): boolean {
        return this.start < this.end;
    }

    in(num: number) {
        return num >= this.start && num < this.end;
    }

    contains(range: Range): boolean {
        return range.start > this.start && range.end < this.end;
    }

    overlap(range: Range): boolean {
        return (range.start <= this.end && range.start >= this.start)
            || (range.end >= this.start && range.end <= this.end );
    }

    /**
     * get Range of element in this & in range
     */
    intersection(range: Range): Range|null {

        if(!this.overlap(range)) {
            return null;
        }

        return new Range(
            Math.max(this.start, range.start),
            Math.min(this.end, range.end)
        );
    }

    toString(): string {
      return `R(${this.start},${this.end})`;
    }
}
