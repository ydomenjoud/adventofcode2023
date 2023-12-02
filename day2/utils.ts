import { Game, Hand } from './test';

export function extractGameDataFromLinePart1(line: string): Game {

    const [gameInfo, handsInfo] = line.split(':');
    const gameId = +(gameInfo.split(' ')[1]);

    const hands = handsInfo.split(';')
        .map(h => {
            const store: Hand = new Map();
            h.split(',').map(c => {
                const [num, color] = c.trim().split(' ');
                store.set(color, +num);
            });
            return store;
        });

    return {
        id: gameId,
        hands
    };
}

export function isGamePossibleWithProvidedLimitPart1(
    game: Game,
    limits: Hand,
): boolean {

    return !game.hands.some(h => {
        for (const [color, num] of h) {
            for (const [lcolor, lnum] of limits) {
                if (color === lcolor && num > lnum) {
                    return true;
                }
            }
        }
        return false;
    });

}

export function getMinimalCubesRequiredToPlayThisGamePart2(
    game: Game
): Hand {

    const minimals: Hand = new Map();

    game.hands.forEach(h => {
        h.forEach((num, color) => {
            const actual = minimals.get(color) || 0;
            if (actual < num) {
                minimals.set(color, num);
            }
        });
    });

    return minimals;
}

export function getPowerOfGamePart2(game: Game) {
    return [...getMinimalCubesRequiredToPlayThisGamePart2(game).values()]
        .reduce((a, b) => a * b);
}
