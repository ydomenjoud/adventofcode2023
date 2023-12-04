import { hash, matrixGrabAdjacentsByPattern, matrixGrabByPattern, MatrixMatch } from '../utils/matrix.utils';
import { isNumber } from '../utils/number.utils';


export function sumNumberAdjacentSymbol(
    matrix: string[]
): number {
    let sum = 0;
    const numbersList = matrixGrabByPattern({
        matrix,
        matcher: isNumber
    });
    for(const number of numbersList) {
        const adjacentsList = matrixGrabAdjacentsByPattern({
            positionsList: number.positionsList,
            matrix,
            matcher: char => char !== '.' && !isNumber(char)
        });
        if(adjacentsList.length > 0) {
            sum += Number(number.match);
        }
    }
    return sum;
}


export function sumGearsRatio(matrix: string[]): number {
    // on récupère la liste des numéros
    const numbersList = matrixGrabByPattern({
        matrix,
        matcher: isNumber
    });

    const store: Map<string, MatrixMatch[]> = new Map();
    // on va stocker tous les nombres à côté d'une astérique
    for (const number of numbersList) {
        const adjacentsList = matrixGrabAdjacentsByPattern({
            matrix,
            positionsList: number.positionsList,
            matcher: char => char === '*'
        });
        for (const adjacent of adjacentsList) {
            const position = hash(adjacent.positionsList[0]);
            const list = store.get(position) || [];
            store.set(position, list.concat(number));
        }
    }


    let sum = 0;
    // pour chacune des asteriques qui a 2 nombre à côté, on les sommes
    for (const matches of store.values()) {
        if(matches.length === 2) {
            sum += +matches[0].match * +matches[1].match
        }
    }

    return sum;

}
