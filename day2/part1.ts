import { readLineByLine } from '../utils/file.utils';
import { extractGameDataFromLinePart1, isGamePossibleWithProvidedLimitPart1 } from './utils';

async function main() {

    const limit = new Map([['red', 12], ['green', 13], ['blue', 14]])

    let sum = 0;
    for await (const line of readLineByLine('input.txt')) {
        const game = extractGameDataFromLinePart1(line);
        if(isGamePossibleWithProvidedLimitPart1(
            game,
            limit
        )) {
            sum += game.id;
        }
    }

    console.log(sum);
}

main();
