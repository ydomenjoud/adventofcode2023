import { Range } from '../utils/array.utils';
import { grabNumbersInString } from '../utils/number.utils';

export type RangePart1 = {
    destination: number;
    source: number;
    length: number
}

export function getDestinationRange(
    number: number,
    rangesList: RangePart1[]
): number {

    const matchingRange = rangesList.find(({source, length}) => {
        return number >= source && number < source + length;
    });

    if (!matchingRange) {
        return number;
    }

    return number - matchingRange.source + matchingRange.destination;
}

export type Almanac = {
    seeds: number[];
    converters: Array<{
        source: string;
        destination: string,
        ranges: RangePart1[]
    }>
}

export function parseInput(rows: string[]): Almanac {

    const almanac: Almanac = {
        seeds: [],
        converters: []
    };

    const [seedsAsString, , ...nextRows] = rows;
    almanac.seeds = grabNumbersInString(seedsAsString);

    let currentConverter: Almanac['converters'][number] | null = null;
    for (const row of nextRows) {

        if(row.trim() === '') {
            continue;
        }

        if (row.includes('map')) {
            if (currentConverter) {
                almanac.converters.push(currentConverter);
            }
            const [source, ,destination] = row.split(' ')[0].split('-');
            currentConverter = {
                ranges: [],
                source,
                destination
            };
            continue;
        }

        if(!currentConverter) {
            throw Error('should not get an empty converter here');
        }

        const [destination, source, length] = grabNumbersInString(row);
        currentConverter.ranges.push({source, destination, length});
    }

    // ajouter le dernier
    if(currentConverter) {
        almanac.converters.push(currentConverter);
    }

    return almanac;
}

export function getSeedLocation(seed: number, almanac: Almanac): number {
    let currentSource = 'seed';
    let currentNumber = seed;
    while(currentSource!=='location') {
        const sourceMap = almanac.converters.find(c => c.source === currentSource);
        if(!sourceMap) {
            throw Error("can't find a converter for this source "+ currentSource);
        }
        currentNumber = getDestinationRange(currentNumber, sourceMap.ranges);
        currentSource = sourceMap.destination;
    }
    return currentNumber;
}

export function getSeedRangeLocation(seed: Range, almanac: Almanac): Range[] {
    let currentSource = 'seed';
    let currentRange: Range[] = [seed];
    while(currentSource!=='location') {
        const sourceMap = almanac.converters.find(c => c.source === currentSource);
        if(!sourceMap) {
            throw Error("can't find a converter for this source "+ currentSource);
        }

        const ranges = sourceMap.ranges.map(({source, length}) => new Range(source, source+length-1))

        const overrideRange: Range[] = [];
        // on découpe les ranges actuelles en nouvelles ranges
        for(const current of currentRange) {
            // pour chaque range
            for (const range of ranges) {
                // est ce que la range est valide ?
                if(!range.overlap(current)) {
                    continue;
                }

                // sinon on récupère l'intersection
                const intersection = range.intersection(current);
                if(!intersection) {
                    throw Error('empty intersection')
                }
                overrideRange.push(intersection);
            }
        }
        console.log({
            current: currentRange,
            ranges: ranges,
            currentSource,
            overrideRange,
        })
        currentRange = overrideRange
        currentSource = sourceMap.destination;
    }
    return currentRange;
}
