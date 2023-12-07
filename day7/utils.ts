import { dedupe } from '../utils/array.utils';
import { occurence } from '../utils/string.utils';

const cardLabelsList1 = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;
const cardLabelsList2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'] as const;
const handTypesList = [
    'five-of-a-kind',
    'four-of-a-kind',
    'full-house',
    'three-of-a-kind',
    'two-pair',
    'one-pair',
    'high-card'
] as const;
export type HandType = typeof handTypesList[number];

export function getHandType1(hand: string): HandType {
    const dedupedHand = dedupe(hand.split(''));
    const deduped = dedupedHand.length;

    const repartition = dedupedHand.map(card => ({card, nb: occurence(hand, card)}));
    const group = (of: number) => repartition.filter(r => r.nb === of).length;

    switch (deduped) {
        case 1:
            return 'five-of-a-kind';
        case 2:
            if (group(4) === 1) {
                return 'four-of-a-kind';
            }
            if (group(3) === 1) {
                return 'full-house';
            }
            break;
        case 3:
            if (group(2) === 2) {
                return 'two-pair';
            } else {
                return 'three-of-a-kind';
            }
        case 4:
            if (group(2) === 1) {
                return 'one-pair';
            }
            break;
        case 5:
            return 'high-card';

    }
    return 'high-card';
}

export function orderHandsList1(hand1: string, hand2: string): number {

    const [power1, power2] = [hand1, hand2].map(
        h => handTypesList.findIndex(
            a => a === getHandType1(h)
        )
    );

    if (power1 < power2) {
        return 1;
    } else if (power1 > power2) {
        return -1;
    }

    for (let card = 0; card < hand1.length; card++) {
        const [card1, card2] = [hand1, hand2].map(h => cardLabelsList1.findIndex(c => c === h[card]));
        if (card1 === card2) {
            continue;
        }
        return card1 < card2 ? 1 : -1;
    }

    throw Error('identical card');

}

export function getHandType2(hand: string): HandType {
    const dedupedHand = dedupe(hand.split(''));
    const dedupedHandWithoutJoker = dedupedHand.filter(c => c !== 'J');
    const dedupedWithoutJoker = dedupedHandWithoutJoker.length;
    const nbOfJoker = occurence(hand, 'J');

    const repartitionWithoutJoker = dedupedHandWithoutJoker
        .map(card => ({card, nb: occurence(hand, card)}))
        .sort((a, b) => {
            // on cherche le plus grand nombre de carte identique
            // 3A et 1K, on ajoute au A
            if (a.nb < b.nb) {
                return 1;
            }
            if(a.nb > b.nb) {
                return -1;
            }

            // sinon on ajoute au paquet de carte la plus haute
            // 2Q et 2K, on ajoute au K
            const powerA = cardLabelsList2.findIndex(c => c === a.card);
            const powerB = cardLabelsList2.findIndex(c => c === b.card);
            return powerA < powerB ? 1 : -1;
        });
    if(repartitionWithoutJoker.length === 0) {
        return 'five-of-a-kind';
    }
    // on ajoute les jokers à la carte la plus forte
    repartitionWithoutJoker[0].nb += nbOfJoker;

    const group = (of: number) => repartitionWithoutJoker.filter(r => r.nb === of).length;


    switch (dedupedWithoutJoker) {
        case 1:
            return 'five-of-a-kind';
        case 2:
            if (group(4) === 1) {
                return 'four-of-a-kind';
            }
            if (group(3) === 1) {
                return 'full-house';
            }
            break;
        case 3:
            if (group(2) === 2) {
                return 'two-pair';
            } else {
                return 'three-of-a-kind';
            }
        case 4:
            if (group(2) === 1) {
                return 'one-pair';
            }
            break;
        case 5:
            return 'high-card';

    }

    throw new Error("can't get type");
}

export function orderHandsList2(hand1: string, hand2: string): number {

    const [power1, power2] = [hand1, hand2].map(
        h => handTypesList.findIndex(
            a => a === getHandType2(h)
        )
    );

    if (power1 < power2) {
        return 1;
    } else if (power1 > power2) {
        return -1;
    }
    for (let card = 0; card < hand1.length; card++) {
        const [card1, card2] = [hand1, hand2].map(h => cardLabelsList2.findIndex(c => c === h[card]));
        if (card1 === card2) {
            continue;
        }
        return card1 < card2 ? 1 : -1;
    }

    throw Error('identical card');
}
