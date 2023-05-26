function charsum (s: any) {
    let i, sum = 0;
    for (i = 0; i < s.length; i++) {
        sum += (s.charCodeAt(i) * (i+1));
    }
    return sum
}

export function array_hash(a: any[]) {
    if (!a) return null

    let i, sum = 0
    for (i = 0; i < a.length; i++) {
        let cs = charsum(a[i])
        sum = sum + (65027 / cs)
    }
    return ("" + sum).slice(0, 16)
}
