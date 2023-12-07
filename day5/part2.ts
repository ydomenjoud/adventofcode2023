import { Range } from '../utils/array.utils';
import { readWholeFile } from '../utils/file.utils';
import { getSeedLocation, getSeedRangeLocation, parseInput } from './utils';

async function main() {

    const almanac = parseInput(await readWholeFile('input.txt'));

    let lowest = null;
    for (let i = 0; i < almanac.seeds.length; i = i + 2) {
        const start = almanac.seeds[i];
        const end = start + almanac.seeds[i + 1];
        for (let seed = start; seed < end; seed++) {
            const location = getSeedLocation(seed, almanac);
            lowest = Math.min(lowest || location, location);
        }
    }

    console.log(lowest);

}

async function main2() {

    const almanac = parseInput(await readWholeFile('sample.txt'));

    const ranges: Range[] = [];
    for (let i = 0; i < almanac.seeds.length; i = i + 2) {
        const start = almanac.seeds[i];
        const end = start + almanac.seeds[i + 1];
        const range = new Range(start, end);
        ranges.push(...getSeedRangeLocation(range, almanac));
        break;
    }

    console.log(Math.min(...(ranges.map(r => r.start))));

}

main();
