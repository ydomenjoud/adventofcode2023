import { readWholeFile } from '../utils/file.utils';
import { followPathPart1, parse } from './utils';


async function main() {
    const informations = await readWholeFile('input.txt');

    const {path, map} = parse(informations);
    console.log(followPathPart1(path, map));
}

main();
