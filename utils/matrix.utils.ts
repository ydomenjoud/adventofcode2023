export type MatrixPosition = { row: number, col: number };
export type MatrixMatch = {
    match: string,
    positionsList: MatrixPosition[]
}

export type MatrixMatcher = (char: string, currentValue: string, matrix: string[]) => boolean

export function hash(position: MatrixPosition) {
    return `${position.row}-${position.col}`;
}

export function matrixGrabByPattern(
    {matrix, matcher}:
        {
            matrix: string[],
            matcher: MatrixMatcher
        }
): MatrixMatch[] {
    const matchesList: MatrixMatch[] = [];

    let currentMatch = '';
    let currentPositionsList: MatrixPosition[] = [];

    const storeMatch = () => {
        if (currentMatch.length > 0) {
            matchesList.push({
                match: currentMatch,
                positionsList: currentPositionsList
            });
            // reset
            currentMatch = '';
            currentPositionsList = [];
        }
    };

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const char = matrix[row][col];
            if (matcher(char, currentMatch, matrix)) {
                currentMatch += char;
                currentPositionsList.push({row, col});
            } else {
                storeMatch();
            }
        }

        // a la fin de la ligne, si on a des données encore présente
        // on les stocke
        storeMatch();
    }

    return matchesList;
}

export function matrixGrabAdjacentsByPattern(
    {positionsList, matrix, matcher}:
        {
            positionsList: MatrixPosition[],
            matrix: string[],
            matcher?: MatrixMatcher
        }
): MatrixMatch[] {
    const matchesList: MatrixMatch[] = [];

    // on récupère les 4 bornes
    let minRow = matrix.length;
    let maxRow = 0;
    let minCol = matrix[0].length;
    let maxCol = 0;

    positionsList.forEach(({row, col}) => {
        minRow = Math.max(0, Math.min(minRow, row - 1));
        maxRow = Math.min(matrix.length-1, Math.max(maxRow, row + 1));
        minCol = Math.max(0, Math.min(minCol, col - 1));
        maxCol = Math.min(matrix[row].length-1, Math.max(maxCol, col + 1));
    });

    // On récupère tous les caractères qui sont dans les bornes
    for (let row = minRow; row < maxRow+1; row++) {
        for (let col = minCol; col < maxCol+1; col++) {
            if (!matrix[row]) {
                console.log(matrix, {row, col}, positionsList);
            }
            const char = matrix[row][col];
            const position: MatrixPosition = {row, col};
            const isMatched = !matcher || matcher(char, '', matrix);
            const isNotAlreadyStored = !positionIsInList(
                position,
                matchesList.flatMap(m => m.positionsList)
            );
            const isNotInPositionsList = !positionIsInList(
                position,
                positionsList
            );

            if (isMatched && isNotAlreadyStored && isNotInPositionsList) {
                matchesList.push({
                    match: char,
                    positionsList: [position]
                });
            }
        }
    }

    return matchesList;
}

export function positionIsInList(
    position: MatrixPosition,
    list: MatrixPosition[]
): boolean {
    return list.some(({row, col}) => position.row === row && position.col === col);
}
