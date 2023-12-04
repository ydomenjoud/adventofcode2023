import { readWholeFile } from '../utils/file.utils';
import { sumGearsRatio } from './utils';

async function main() {

    const matrix = await readWholeFile('input.txt');

    const sum = sumGearsRatio(matrix);

    console.log(sum);
}

main();
