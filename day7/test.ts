import assert from 'node:assert';
import { describe, it, } from 'node:test';
import { getHandType1, getHandType2, HandType, orderHandsList1, orderHandsList2 } from './utils';

describe('day 7', () => {

    describe('part1', () => {
        it('should get good type', () => {
            const cards: Record<string, HandType> = {
                'AAAAA': 'five-of-a-kind',
                'AA8AA': 'four-of-a-kind',
                '23332': 'full-house',
                'TTT98': 'three-of-a-kind',
                '23432': 'two-pair',
                'A23A4': 'one-pair',
                '23456': 'high-card'
            };
            Object.keys(cards).forEach((key, i) => {
                assert.equal(getHandType1(key), cards[key], `${key} is not ${getHandType1(key)} (expected ${cards[key]})`);
            });
        });

        it('should order hands', () => {
            const sample = [
                '32T3K 765',
                'T55J5 684',
                'KK677 28',
                'KTJJT 220',
                'QQQJA 483',
            ];

            const handsList = sample.map(s => s.split(' ')[0]);
            handsList.sort(orderHandsList1);

            assert.deepStrictEqual(
                handsList,
                ['32T3K', 'KTJJT', 'KK677', 'T55J5', 'QQQJA']
            );
        });

    });

    describe('part2', () => {
        it('should get good type', () => {

                const cardsList: Record<string, string[]> = {
                    'five-of-a-kind': ['QQJQQ'],
                    'four-of-a-kind': ['QAJJQ', 'QQQJA', 'KTJJT'],
                    'full-house': ['23J32'],
                    'three-of-a-kind': ['TJT98', '2QQJ5'],
                    'two-pair': [],
                    'one-pair': ['134J2', 'J2KA4'],
                    'high-card': []
                };

                for(const type in cardsList) {
                    const handsList = cardsList[type];
                    for(const hand of handsList) {
                        assert.equal(
                            getHandType2(hand),
                            type,
                            `${hand} is not ${getHandType2(hand)} (expected ${type})`);
                    }

                }
            }
        );
        it('should order hands', () => {

            const samples = [
                ['T55J5', 'KTJJT'],
                ['KTJJT', 'A55J5',],
                ['QQQJA', 'KTJJT'],
                ['32T3K', 'KK677', 'T55J5', 'QQQJA', 'KTJJT'],
            ];

            samples.forEach(s => {
                assert.deepStrictEqual(
                    [...s].sort(orderHandsList2),
                    s,
                    `hand: ${s}`
                );
            });
        });

        it('should order complexe hands', () => {
            const [hand1, hand2] = ['TJJJJ', 'QQQQQ'];

            const handsList = [hand1, hand2].map(s => s.split(' ')[0]);
            handsList.sort(orderHandsList2);

            assert.deepStrictEqual(
                handsList,
                [hand1, hand2]
            );
        });
    });
});
