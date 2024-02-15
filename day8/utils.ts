export function parse(input: string[]) {
    const [path, , ...mapAsRows] = input;
    const map = new Map();
    mapAsRows.forEach(row => {
        const [, base, left, right] = row.match(/([A-Z]{3}) =.*([A-Z]{3}).*([A-Z]{3}).*$/s) || [];
        map.set(base, [left, right]);
    });

    return {path, map};
}

export function followPathPart1(
    path: string,
    map: Map<string, [string, string]>
) {
    let step = 0;
    let current: string = 'AAA';

    while (current !== 'ZZZ') {
        const directionIndex = path[step++ % path.length] === 'L' ? 0 : 1;
        const test = map.get(current)?.[directionIndex];
        if (!test) {
            return;
        }
        current = test;
    }

    return step;
}
