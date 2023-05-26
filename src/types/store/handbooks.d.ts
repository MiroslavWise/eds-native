import { Dispatch } from "react"

export type THandbooks = 'casein' | 'control' | 'correspondent' | 'doc-type' | 'nomenclature' | 'position' | 'question'

export interface ITypeHandbook {
    type: THandbooks
    input: Record<THandbooks, string>
    search_input: Record<THandbooks, string>

    setType: Dispatch<THandbooks>
    setInput(type: THandbooks, value: string): void
    setSearch: Dispatch<THandbooks>
}
