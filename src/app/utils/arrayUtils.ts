export const cloneArray = (arr: any[]) =>
    arr.map(element => ({ ...element }));