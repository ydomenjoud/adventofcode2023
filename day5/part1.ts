import { readWholeFile } from '../utils/file.utils';
import { getSeedLocation, parseInput } from './utils';

async function main() {

    const almanac = parseInput(await readWholeFile('input.txt'));

    let lowest = null;
    for (const seed of almanac.seeds) {
        const location = getSeedLocation(seed, almanac);
        lowest = Math.min(lowest || location, location);
    }

    console.log(lowest);

}

main();
