export const DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss";

export const range = (end: number | string) => {
    const result: number[] = []
    for (let i: number = 9; i <= +end; i++) {
        result.push(i)
    }
    return result;
};
