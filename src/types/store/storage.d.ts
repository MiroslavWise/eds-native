import { Dispatch, DispatchWithoutAction } from "react"

interface IValueLogin{
        email: string
        password: string
}

export interface IStorage {
        token: string | null
        refreshToken: string | null
        
        async useLogin(values: IValueLogin): Promise<({ login: boolean })>
        useDelete: DispatchWithoutAction
}