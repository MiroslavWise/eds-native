import { Dispatch, DispatchWithoutAction } from "react"


export type TListType = "LIST_INTERNAL_DOCUMENTS" | "LIST_OUTGOING_DOCUMENTS" | "LIST_ORDER" | "LIST_PROTOCOLS" | "LIST_INCOMING_DOCUMENTS"
export type TDownloadLink = "LIST_INTERNAL_DOCUMENTS_EXPORT" | "LIST_OUTGOING_DOCUMENTS_EXPORT" | "LIST_ORDER_EXPORT" | "LIST_PROTOCOLS_EXPORT" | "LIST_INCOMING_DOCUMENTS_EXPORT"
export type TTypeDate = "month" | "quarter" | "period" | "year"
export type TFilter = "number" | "summary" | "author"
export type TTitleDocs = 'incomings' | 'outgoings' | 'internals' | 'protocols' | 'productionOrders'

export interface IUseDocs {
    page: {
        incoming: number
        outgoing: number
        internal: number
        protocol: number
        order: number
    }
    status: {
        incoming: string
        outgoing: string
        internal: string
        protocol: string
        order: string
    }
    input: {
        incoming: string
        outgoing: string
        internal: string
        protocol: string
        order: string
    }
    type_filter: {
        incoming: TFilter
        outgoing: TFilter
        internal: TFilter
        protocol: TFilter
        order: TFilter
    }

    setData: {
        incoming(): Promise<{ data: any[], total: number }>
        outgoing(): Promise<{ data: any[], total: number }>
        internal(): Promise<{ data: any[], total: number }>
        protocol(): Promise<{ data: any[], total: number }>
        order(): Promise<{ data: any[], total: number }>
    }
    setPage: {
        incoming: Dispatch<number>
        outgoing: Dispatch<number>
        internal: Dispatch<number>
        protocol: Dispatch<number>
        order: Dispatch<number>
    }
    setStatus: {
        incoming: Dispatch<string>
        outgoing: Dispatch<string>
        internal: Dispatch<string>
        protocol: Dispatch<string>
        order: Dispatch<string>
    }
    // setDownload: {
    //     incoming: DispatchWithoutAction
    //     outgoing: DispatchWithoutAction
    //     internal: DispatchWithoutAction
    //     protocol: DispatchWithoutAction
    //     order: DispatchWithoutAction
    // }
    setReset: DispatchWithoutAction
    setTypeFilter: {
        incoming: Dispatch<TFilter>
        outgoing: Dispatch<TFilter>
        internal: Dispatch<TFilter>
        protocol: Dispatch<TFilter>
        order: Dispatch<TFilter>
    }
    setInput: {
        incoming: Dispatch<string>
        outgoing: Dispatch<string>
        internal: Dispatch<string>
        protocol: Dispatch<string>
        order: Dispatch<string>
    }
}
