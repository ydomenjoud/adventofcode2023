import { sum } from '../utils/number.utils';

export function extractCardData(card: string) {
    const data = card.split(':');
    const [winning, owned] = data[1].split('|').map(v => v.split(' ').filter(w => w.trim() !== '').map(Number));
    const cardNumber = Number(data[0].split(' ')[1]);
    return {winning, owned, number: cardNumber};
}

export function getCardValue(card: string): number {
    const {winning, owned} = extractCardData(card);
    const winningCount = winning.filter(w => owned.some(o => o === w)).length;
    if (winningCount === 0) {
        return 0;
    }
    if (winningCount === 1) {
        return 1;
    }
    return Math.pow(2, winningCount - 1);
}

export function getCardNumberWonByCard(card: string): { number: number, won: number[] } {
    const {number, winning, owned} = extractCardData(card);
    const winningCount = winning.filter(w => owned.some(o => o === w)).length;
    if (winningCount === 0) {
        return {number, won: []};
    }

    const numbersList: number[] = [];
    for (let i = number + 1; i <= number + winningCount; i++) {
        numbersList.push(i);
    }
    return {number, won: numbersList};
}

export function getNumbersOfCardsWon(cardsList: string[]): number {
    const winningStore: Map<number, number[]> = new Map();
    const wonStore: Map<number, number> = new Map();

    const add = (num: number) => wonStore.set(num, (wonStore.get(num) || 0) +1);

    // on stocke les cartes gagnantes
    for (const card of cardsList) {
        const {won, number} = getCardNumberWonByCard(card);
        if (won.length > 0) {
            winningStore.set(number, won);
        } else {
            // si elle n'est pas gagnante, on la compte pour un exemplaire quand meme
            add(number);
        }
    }


    const getCardsWonByNum = (num: number): void => {
        add(num);
        (winningStore.get(num) || []).map(getCardsWonByNum)
    };

    [...winningStore.keys()].forEach(getCardsWonByNum);
    return sum([...wonStore.values()])
}
