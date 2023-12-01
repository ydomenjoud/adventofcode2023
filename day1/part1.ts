import { readLineByLine } from '../utils/file.utils';
import { extractFirstAndLastNumberPart1 } from './utils';

async function main() {

    let sum = 0;

    for await (const line of readLineByLine('input.txt')) {
        const [first, last] = extractFirstAndLastNumberPart1(line);
        sum += +(first  + '' + last);
    }

    console.log(sum);
}

main();
