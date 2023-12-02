import assert from 'assert';
import { describe, it } from 'node:test';
import {
    extractGameDataFromLinePart1,
    getMinimalCubesRequiredToPlayThisGamePart2, getPowerOfGamePart2,
    isGamePossibleWithProvidedLimitPart1
} from './utils';

export type Hand = Map<string, number>

export interface Game {
    id: number;
    hands: Hand[];
}


describe('day 2', () => {

    describe('part1', () => {
        const game: Game = {
            id: 1,
            hands: [
                new Map([['blue', 3], ['red', 4]]),
                new Map([['red', 1], ['green', 2], ['blue', 6]]),
                new Map([['green', 2]]),
            ]
        };
        it('should extract number from string', () => {

            const input = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
            const {id, hands: [firstHand, secondHand, thirdHand]} = extractGameDataFromLinePart1(input);

            assert.equal(id, 1);
            assert.equal(firstHand.get('blue'), 3);
            assert.equal(firstHand.get('red'), 4);
            assert.equal(secondHand.get('red'), 1);
            assert.equal(secondHand.get('green'), 2);
            assert.equal(secondHand.get('blue'), 6);
            assert.equal(thirdHand.get('green'), 2);

        });

        it('should indicate possible game with single limit', () => {
            const notEnoughBlue = isGamePossibleWithProvidedLimitPart1(
                game,
                new Map([['blue', 4]])
            );
            assert.equal(notEnoughBlue, false);
        });
        it('should indicate possible game with multiple limit', () => {
            const notEnoughBlue = isGamePossibleWithProvidedLimitPart1(
                game,
                new Map([['blue', 3], ['green', 3]])
            );
            assert.equal(notEnoughBlue, false);
        });
    });

    describe('part2', () => {
        it('should get minimal amount of cube required to play', () => {

            const game: Game = {
                id: 1,
                hands: [
                    new Map([['blue', 3], ['red', 4]]),
                    new Map([['red', 1], ['green', 2], ['blue', 6]]),
                    new Map([['green', 2]]),
                ]
            };
            assert.deepStrictEqual(
                [...getMinimalCubesRequiredToPlayThisGamePart2(game).entries()],
                [['blue', 6], ['red', 4], ['green', 2]]
            );


        });
        it('should calcul power of game', () => {
            const game: Game = {
                id: 1,
                hands: [
                    new Map([['blue', 3], ['red', 4]]),
                    new Map([['red', 1], ['green', 2], ['blue', 6]]),
                    new Map([['green', 2]]),
                ]
            };
            assert.equal(
                getPowerOfGamePart2(game),
                48);
        });

    });
});
