import { readWholeFile } from '../utils/file.utils';
import { matrixGrabAdjacentsByPattern, matrixGrabByPattern } from '../utils/matrix.utils';
import { isNumber } from '../utils/number.utils';

async function main() {

    let sum = 0;
    const engine = await readWholeFile('input.txt');
    const numbersList = matrixGrabByPattern({
        matrix: engine,
        matcher: isNumber
    });
    for(const number of numbersList) {
        const adjacentsList = matrixGrabAdjacentsByPattern({
            positionsList: number.positionsList,
            matrix: engine,
            matcher: char => char !== '.' && !isNumber(char)
        });
        if(adjacentsList.length > 0) {
            sum += Number(number.match);
        }
    }
    console.log(sum);
}

main();
