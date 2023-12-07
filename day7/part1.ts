import { readWholeFile } from '../utils/file.utils';
import { orderHandsList1 } from './utils';


async function main() {
    let total = 0;
    const informations = await readWholeFile('input.txt');

    const handsList = informations.sort((a, b) => {
        const extractCards = (d: string) => d.split(' ')[0];
        return orderHandsList1(extractCards(a), extractCards(b));
    });

    handsList.forEach((hand, index) => {
        total += (index+1) * Number(hand.split(' ')[1]);
    })

    console.log(total); // 250120186
}

main();
