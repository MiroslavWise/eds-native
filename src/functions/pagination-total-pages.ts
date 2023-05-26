




export const PaginationTotalPages = (value: number | undefined, offset: number): number[] => {
        const n = value ? Math.ceil(value / offset) : 1
        const arr: number[] = []
        for (let i = 1; i <= n; i++){
                arr.push(i)
        }
        return arr
}