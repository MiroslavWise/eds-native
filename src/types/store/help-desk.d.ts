import { Dispatch, DispatchWithoutAction } from "react"
import { People } from "../types_rest"

export type TStatusHelp = "DRAFT" | "SENT" | "SEND_ERROR" | "EXECUTING" | "ON_CHECK" | "DENIED" | "CLOSED"

export interface IFilesHelp{
    document: number
    file_name: string
    file_type: string
    file_url: string
    id: number
    upload_finished_at: string
    uuid: string
}

export interface IData{
    created_at: string
    description: string
    document_link: string
    id: number
    updated_at: string
    uuid: string
    executor: string
    denied_reason: string
    number: string
    author: People
    status: TStatusHelp
    files: IFilesHelp[]
}

export interface IHelp{
    data: IData[]
    total: number
    page: number
    loading: boolean

    setData: DispatchWithoutAction
    setPage: Dispatch<number>
    setReset: DispatchWithoutAction
}
