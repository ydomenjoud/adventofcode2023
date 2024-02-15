import { readWholeFile } from '../utils/file.utils';
import { parse } from './utils';

type History = {code: string, direction: string, step: number, end?: boolean}[]

async function main() {
    const informations = await readWholeFile('input.txt');

    let iterations: Map<string,History> = new Map();

    const {path, map} = parse(informations);
    // on recherche les départs ..A
    const startsList = Array.from<string>(map.keys()).filter(k => k.endsWith('A'));

    startsList.forEach(s => {
        // init

        const history: History = [];
        let step = 1;
        let current: string = s;
        let direction = path[step];

        while (!history.find(h => h.code === current && h.direction === direction)) {

            history.push({
                code: current,
                direction,
                step,
                end: current.endsWith('Z'),
            })


            direction = path[step % path.length]
            const directionIndex = direction === 'L' ? 0 : 1;
            const test = map.get(current)?.[directionIndex];
            if (!test) {
                return;
            }
            current = test;


            step++;

            const loopStart = history.findIndex(h => h.code === current && h.direction === direction);
            if(loopStart > -1) {
                history.push({
                    code: current,
                    direction,
                    step,
                    end: current.endsWith('Z'),
                })

                console.log(s, 'found', current);
                console.log(history);
                break;
            }
        }

        iterations.set(s, history);

    })

    // console.log(iterations)
    // on recherche les cycles


}

main();
