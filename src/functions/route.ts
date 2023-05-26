

export type TRouteConsonants = "EMPTY" | "PAR" | "CONS"

export const routeName = (route: TRouteConsonants | undefined) => {
        if(!route) return "Без согласования"
        const obj: Record<TRouteConsonants, string> = {
                EMPTY: 'Без согласования',
                PAR: 'parallel',
                CONS: 'consecutive',
        }

        return obj.hasOwnProperty(route) ? obj[route] : "Без согласования"
}