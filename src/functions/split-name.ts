export const SplitName = (str: string): string => {
    const arr = str?.split(' ')
    const last = arr?.length > 0 && arr[0]
    const first = arr?.length >= 2 ? arr[1] : ''
    const middle = arr?.length >= 3 ? arr[2] : ''
    return `${last}${first ? ` ${first.slice(0, 1)}.` : ''}${middle ? ` ${middle?.slice(0, 1)}.` : ''}`
}
