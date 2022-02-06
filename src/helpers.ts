export const convertToObject = (list: string[]): { [key: string]: number } => {
    const obj: { [key: string]: number } = {};
    for (const c of list) {
        obj[c] = 1;
    }
    return obj;
}
