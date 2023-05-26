import { Dispatch, DispatchWithoutAction } from "react"

export type TTypeFilter = "author" | "reg_num" | "executors"

export interface IResolutionStore {
    type: TResolution

    setType: (args: TResolution) => void
}

export interface IFilterFields {
    reg_num: string
    author: string
    executors: string
}
interface IGenericTypeResolution<T>{
    incomings: T
    internals: T
    protocols: T
    orders: T
}

export interface IFilter {
    page: IGenericTypeResolution<number>
    input: IGenericTypeResolution<string>
    type_filter: IGenericTypeResolution<TTypeFilter>
    object_filter: IGenericTypeResolution<Record<IFilterFields, string | number>>

    setPage: IGenericTypeResolution<Dispatch<number>>
    setInput: IGenericTypeResolution<Dispatch<string>>
    setTypeFilter: IGenericTypeResolution<Dispatch<TTypeFilter>>
    onSearch: IGenericTypeResolution<DispatchWithoutAction>
}