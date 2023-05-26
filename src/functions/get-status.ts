export type TStatusSteps = '__process__' | '__success__' | ''

const getStatus = (number: number, current: number, status?: string): TStatusSteps => {
        if (number < current) return '__success__'
        if (number === current) return '__process__'
        if (number > current) return ''
        return ''
}

export { getStatus }