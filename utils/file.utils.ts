import { createReadStream } from 'fs';
import {
    createInterface
} from 'readline';

export async function* readLineByLine(
    file: string,
) {
    const rl = createInterface({
        input: createReadStream(file),
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        yield line;
    }
}

export async function readWholeFile(
    file: string
): Promise<string[]> {

    const linesList: string[] = [];
    for await(const line of readLineByLine(file)) {
        linesList.push(line);
    }
    return linesList;

}
