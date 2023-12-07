import { readWholeFile } from '../utils/file.utils';
import { grabNumbersInString } from '../utils/number.utils';
import { getNumbersOfWaysToBeatTheRecord } from './utils';

async function main() {
    let total = 1;
    const racesInformations = await readWholeFile('input.txt');
    const timesList = grabNumbersInString(racesInformations[0]);
    const recordsList = grabNumbersInString(racesInformations[1]);

    for (let i = 0; i < timesList.length; i++) {
        total *= getNumbersOfWaysToBeatTheRecord({time: timesList[i], record: recordsList[i]})
    }

    console.log(total);
}

main()
