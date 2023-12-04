import assert from 'assert';
import { describe, it } from 'node:test';
import path from 'path';
import { readWholeFile } from '../utils/file.utils';
import { sumGearsRatio, sumNumberAdjacentSymbol } from './utils';

describe('day 3', () => {

    describe('part1', () => {
        it('should calculate good sum for sample', () => {
            const matrix = [
                '467..114..',
                '...*......',
                '..35..633.',
                '......#...',
                '617*......',
                '.....+.58.',
                '..592.....',
                '......755.',
                '...$.*....',
                '.664.598..',
            ];
            assert.equal(
                sumNumberAdjacentSymbol(matrix),
                4361
            );
        });
        it('should calculate good sum for input', async () => {
            const matrix = await readWholeFile(path.dirname(__filename) + '/input.txt');
            assert.equal(
                sumNumberAdjacentSymbol(matrix),
                556367
            );
        });
    });

    describe('part2', () => {
        it('should calculate gears ratio for sample', () => {
            const matrix = [
                '467..114..',
                '...*......',
                '..35..633.',
                '......#...',
                '617*......',
                '.....+.58.',
                '..592.....',
                '......755.',
                '...$.*....',
                '.664.598..',
            ];
            assert.equal(
                sumGearsRatio(matrix),
                467835
            );
        });
        it('should calculate gears ratio for input', async () => {
            const matrix = await readWholeFile(path.dirname(__filename) + '/input.txt');
            assert.equal(
                sumGearsRatio(matrix),
                89471771
            );
        });

    });
});
