import type { IInfoChat, IPersonInfo } from "../chats"
import { Dispatch, DispatchWithoutAction } from "react"
export interface IChats {
    count: number
    loading: boolean
    data: IInfoChat[]

    getData: DispatchWithoutAction
    reset: DispatchWithoutAction
}

interface ICompanion{

}
interface IChatInfo{
    companion: ICompanion
    created_at: string
    id: number
    is_group: boolean
    uuid: string
    name: string
}

export interface IFile{
    file_name: string
    file_url: string
    uuid: string
}


export interface ICurrentChat{
    uuid: string
    members: {[key: string]:IMembers[]}  | {}
    messages: { [key: string]: IMessages[] }
    info: {
        [key: string]: IChatInfo
    } | {}

    messages_object: {
        [key: string]: IReturnMessages[]
    }

    setData: Dispatch<any>
    getReloadMessages(value?: string): Promise<any>
    reset: DispatchWithoutAction
    setUUID: DispatchWithoutAction
    getCurrentUUID: Dispatch<string>
}

export interface IMessages{
    chat_uuid: string
    created_at: string
    files: IFile[]
    sender: {
        created_at: string
        person: IPersonInfo
    }
    text: string
    uuid: string
}

export interface IReturnMessages {
    messages: {
        text: string
        key: string
        time: string
        file: IFile[]
    }[]
    name: string
    photo: string
    uuid: string
    id: string
}
