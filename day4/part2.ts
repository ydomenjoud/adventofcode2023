import { readWholeFile } from '../utils/file.utils';
import { getNumbersOfCardsWon } from './utils';


async function main() {
    const cardsList = await readWholeFile('input.txt');
    const nbOfCard = getNumbersOfCardsWon(cardsList);
    console.log(nbOfCard);
}

main()
