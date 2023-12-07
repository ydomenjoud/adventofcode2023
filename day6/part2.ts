import { readWholeFile } from '../utils/file.utils';
import { getNumbersOfWaysToBeatTheRecord } from './utils';

async function main() {
    const racesInformations = await readWholeFile('input.txt');
    const extract = (line: string) => Number(Array.from(line.matchAll(/[0-9]+/g)).map(d => d[0]).join(''));
    const time = extract(racesInformations[0]);
    const record = extract(racesInformations[1]);

    const total = getNumbersOfWaysToBeatTheRecord({time, record})

    console.log(total);
}

main()
