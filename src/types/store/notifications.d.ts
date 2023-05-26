import type { IPropsTotal, User } from "../user"
import type { PropsNotification } from "../notification"
import { Person } from "../graphql";
import { Dispatch, DispatchWithoutAction } from "react";

export interface INotifications{
    documents: IPropsTotal | null
    page: number
    results: PropsNotification[]
    total: number
    loading: boolean
    refetch: () => void

    setLoading: Dispatch<boolean>
    setRefetch: Dispatch<() => Promise<any>>
    setPage: Dispatch<number>
    setReset: DispatchWithoutAction
    setResults: Dispatch<PropsNotification[]>
    setTotalNotifications: Dispatch<number>
    setTotalDocuments: Dispatch<IPropsTotal>
}

export interface IUser {
    loading: boolean
    uuid: string | undefined
    user: User | undefined
    isDirector: boolean | undefined,

    refetch(): Promise<any>
    setUserData: Dispatch<User>
    setLoading: Dispatch<boolean>
    setUserReset: DispatchWithoutAction
    setRefetch: Dispatch<() => Promise<any>>
}
