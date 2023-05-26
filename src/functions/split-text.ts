export const SplitText = (value: string | null | undefined, num?: number): string => {
        if (!value) return ``
        if(value.length < (num || 48)) return value
        return `${value.slice(0, (num || 50))}...`
}