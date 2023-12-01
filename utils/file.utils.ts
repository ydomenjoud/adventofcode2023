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
