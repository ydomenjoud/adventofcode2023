import { readLineByLine } from '../utils/file.utils';
import { extractGameDataFromLinePart1, getMinimalCubesRequiredToPlayThisGamePart2, getPowerOfGamePart2 } from './utils';

async function main() {

    let sum = 0;
    for await (const line of readLineByLine('input.txt')) {
        const game = extractGameDataFromLinePart1(line);
        const power = getPowerOfGamePart2(game);
        sum += power;
    }

    console.log(sum);
}

main();
