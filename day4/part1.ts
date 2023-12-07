import { readLineByLine } from '../utils/file.utils';
import { getCardValue } from './utils';

async function main() {
    let sum = 0;
    for await (const line of readLineByLine('input.txt')) {
        sum += getCardValue(line);
    }
    console.log(sum);
}

main()
