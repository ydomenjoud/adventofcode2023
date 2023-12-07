
export function reverseString(str: string): string {
    return [...str].reverse().join('');
}

export function occurence(str: string, search: string): number {
    return str.split(search).length - 1;
}
