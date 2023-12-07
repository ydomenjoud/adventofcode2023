export function isNumber(input: unknown): boolean {
    return !isNaN(Number(input));
}

export function sum(input: number[]): number {
    return input.reduce((v, s) => s + v, 0);
}


export function grabNumbersInString(str: string): number[] {
    return Array.from(str.matchAll(/[0-9]+/g)).map(d => Number(d[0]));
}
