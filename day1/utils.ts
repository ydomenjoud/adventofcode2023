import { reverseString } from '../utils/string.utils';

export function extractFirstAndLastNumberPart1(line: string): [number, number] {
    // on supprime tout ce qui n'est pas un chiffre
    const onlyNumbers = line.replaceAll(/[^0-9]/g, '');

    // si aucun chiffre, une erreur
    if(onlyNumbers.length === 0 ){
        throw Error('no number if in '+line)
    }

    return [
        +onlyNumbers[0],
        +onlyNumbers[onlyNumbers.length - 1]
    ]
}

const numbersList = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

export function extractFirstAndLastNumberPart2(line: string): [number, number] {

    const tokensList = Object.keys(numbersList);
    const reversedTokensList = tokensList.map(reverseString);

    // on récupère le premier token valide
    const firstMatch = line
        .match(new RegExp(`([0-9]|${tokensList.join('|')})`));

    // on récupère le dernier token valide ( en reverse de la chaine )
    const lastMatch = reverseString(line)
        .match(new RegExp(`([0-9]|${reversedTokensList.join('|')})`));

    if (firstMatch === null || lastMatch === null) {
        console.log({firstMatch, lastMatch});
        throw Error('unable to find first or last: ' + line);
    }

    const firstValue = firstMatch[0];
    const lastValue = reverseString(lastMatch[0]);

    const convertToNumber = (value: string) =>
        value in numbersList
            ? +numbersList[value as keyof typeof numbersList]
            : +value;

    const first = convertToNumber(firstValue);
    const last = convertToNumber(lastValue);

    return [
        first,
        last
    ];

}
