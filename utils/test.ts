import assert from 'assert';
import { describe, it } from 'node:test';
import { hash, matrixGrabAdjacentsByPattern, matrixGrabByPattern } from './matrix.utils';
import { isNumber } from './number.utils';

describe('utils', () => {
    describe('matrix', () => {
        it('should extract number from matrix', () => {
            const numbersList = matrixGrabByPattern(
                {
                    matrix: ['467..114..'],
                    matcher: isNumber
                }
            );
            assert.deepStrictEqual(
                numbersList.map(n => +n.match),
                [467, 114]
            );
        });
        it('should extract position from single line matrix', () => {
            const numbersList = matrixGrabByPattern(
                {
                    matrix: ['467..114..'],
                    matcher: isNumber
                }
            );
            assert.deepStrictEqual(
                numbersList.map(n => n.positionsList),
                [
                    [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}],
                    [{row: 0, col: 5}, {row: 0, col: 6}, {row: 0, col: 7}],
                ]
            );
        });
        it('should extract position from 2 dimensionnal matrix', () => {
            const matrix = [
                '467..114..',
                '...*......',
                '..35..633.',
                '......#...'
            ];
            const numbersList = matrixGrabByPattern(
                {
                    matrix,
                    matcher: isNumber
                }
            );
            assert.deepStrictEqual(
                numbersList.map(n => n.positionsList),
                [
                    [{row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}],
                    [{row: 0, col: 5}, {row: 0, col: 6}, {row: 0, col: 7}],
                    [{row: 2, col: 2}, {row: 2, col: 3}],
                    [{row: 2, col: 6}, {row: 2, col: 7}, {row: 2, col: 8}],
                ]
            );
        });
        describe('should extract adjacent chars', () => {
            const verifiyAdjacentMatch = (
                matrix: string[],
                expected: any,
            ) => {
                const list = matrixGrabByPattern({matrix, matcher: isNumber});

                for (let i = 0; i < list.length; i++) {

                    const adjacents = matrixGrabAdjacentsByPattern(
                        {
                            positionsList: list[i].positionsList,
                            matrix,
                            matcher: char => char !== '.'
                        }
                    ).map(a => {
                        return {
                            match: a.match,
                            positions: a.positionsList.map(hash)
                        };
                    });
                    assert.deepStrictEqual(adjacents, expected[i]);
                }
            };
            it('verticaly', () => {
                const matrix = [
                    '467...114.',
                    '.-..*..+..',
                    '...56.....',
                    '...#%.....',
                ];

                verifiyAdjacentMatch(matrix,
                    [
                        [{match: '-', positions: ['1-1']}],
                        [{match: '+', positions: ['1-7']}],
                        [
                            {match: '*', positions: ['1-4']},
                            {match: '#', positions: ['3-3']},
                            {match: '%', positions: ['3-4']}
                        ]
                    ]
                );

            });
            it('horizontaly', () => {
                const matrix = [
                    '*467.114+.',
                    '..........',
                    '...56%....',
                    '.......]8$',
                ];

                verifiyAdjacentMatch(matrix,
                    [
                        [{match: '*', positions: ['0-0']}],
                        [{match: '+', positions: ['0-8']}],
                        [{match: '%', positions: ['2-5']}],
                        [
                            {match: ']', positions: ['3-7']},
                            {match: '$', positions: ['3-9']},
                        ]
                    ]
                );

            });
            it('diagonally', () => {
                const matrix = [
                    '.467..114.',
                    '*....+....',
                    '...56..].$',
                    '..%.....8.',
                    '..%......!',
                ];

                verifiyAdjacentMatch(matrix,
                    [
                        [{match: '*', positions: ['1-0']}],
                        [{match: '+', positions: ['1-5']}],
                        [
                            {match: '+', positions: ['1-5']},
                            {match: '%', positions: ['3-2']},
                        ],
                        [
                            {match: ']', positions: ['2-7']},
                            {match: '$', positions: ['2-9']},
                            {match: '!', positions: ['4-9']},
                        ]
                    ]
                );
            });
        });
    }); // fin matrix
});
