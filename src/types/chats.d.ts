export interface ICreate {
    name: string
    is_group: boolean
    profile_uuid_list: string[]
}

export interface IMessageCreate {
    chat_uuid: string
    tagged?: string[]
    text: string,
    file_uuid_list?: string[]
}

export interface IMessageRead{
    message_uuid_list: string[]
}

interface ICompanion{
    abbreviated_name_ru: string
    get_full_name_ru: string
    photo: string
    position: number
    uuid: string
}

interface ILastMessage{
    chat_uuid: string
    text: string
    created_at: string
    sender: {
        abbreviated_name_ru: string
        get_full_name_ru: string
    }
}

export interface IInfoChat{
    companion: ICompanion
    created_at: string
    id: number
    is_group: boolean
    last_message: ILastMessage
    name: string
    uuid: string
}

export interface IChats{
    count: number
    results: IInfoChat[]
}

export type TChats = "chats"
    | "info"
    | "messages"
    | "members"
    | "chats_create"
    | "members_add"
    | "members_delete"
    | "message_create"
    | "message_read"
    | "upload"
    | "finish"
    | "delete"

export interface IPersonInfo{
    abbreviated_name_ru: string
    get_full_name_ru: string
    photo: string
    uuid: string
}

export interface IMembers{
    chat: number
    created_at: string
    id: number
    is_admin: boolean
    is_creator: boolean
    notification_sound: boolean
    uuid: string
    person: IPersonInfo
}
