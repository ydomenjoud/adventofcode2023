import { readWholeFile } from '../utils/file.utils';
import { getHandType2, orderHandsList2 } from './utils';


async function main() {
    let total = 0;
    const informations = await readWholeFile('input.txt');

    const extractCards = (d: string) => d.split(' ')[0];

    const handsList = informations.sort((a, b) => {
        return orderHandsList2(extractCards(a), extractCards(b));
    });

    handsList.forEach((hand, index) => {
        total += (index+1) * Number(hand.split(' ')[1]);
    });



    console.log(total); // 250120186
}

main();
