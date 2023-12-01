import assert from 'assert';
import { describe, it } from 'node:test';
import {
    extractFirstAndLastNumberPart1,
    extractFirstAndLastNumberPart2
} from './utils';

describe('day 1', () => {

    describe('part1 - should extract number from string', () => {
        it('with 2 numbers', () => {

            const [first, last] = extractFirstAndLastNumberPart1('six6two4lvtjt61');

            assert.equal(first, 6);
            assert.equal(last, 1);
        });
        it('with single number', () => {
            const [first, last] = extractFirstAndLastNumberPart1('six6twolvtjt');
            assert.equal(first, 6);
            assert.equal(last, 6);
        });
    });

    describe('part2 - should extract number from string', () => {
        it('with number, number', () => {
            const [first, last] = extractFirstAndLastNumberPart2('two1nine');
            assert.equal(first, 2);
            assert.equal(last, 9);
        });
        it('with string, number', () => {
            const [first, last] = extractFirstAndLastNumberPart2('two12nin4plop');
            assert.equal(first, 2);
            assert.equal(last, 4);
        });
        it('with number, string', () => {
            const [first, last] = extractFirstAndLastNumberPart2('two12nin4plop');
            assert.equal(first, 2);
            assert.equal(last, 4);
        });
        it('with string, string', () => {
            const [first, last] = extractFirstAndLastNumberPart2('one12nin4plopeight');
            assert.equal(first, 1);
            assert.equal(last, 8);
        });
        it('with single string', () => {
            const [first, last] = extractFirstAndLastNumberPart2('azeazeazeoneazeazeze');
            assert.equal(first, 1);
            assert.equal(last, 1);
        });
        it('with single number', () => {
            const [first, last] = extractFirstAndLastNumberPart2('aannj8qsqdqsd');
            assert.equal(first, 8);
            assert.equal(last, 8);
        });
    });

});
