export type Gender = 'MALE' | 'FEMALE' | null

export type TypeDocuments = 'INTERNAL' | 'OUTGOING' | 'INCOMING' | 'PROTOCOL' | 'PROD_ORDER'
export type StatusOutgoing = 'DRAFT' | 'PENDING_APPROVE' | 'APPROVED' | 'REFUSED' | 'PENDING_SIGNING' | 'ON_REGISTRATION' | 'REGISTERED' | 'SENT' | 'SEND_ERROR'
export type StatusPDF = 'READY' | 'IN_PROCESS' | 'INIT'
export type TypesAction = 'APPROVED' | 'REFUSED' | 'CHOSEN_FOR_APPROVE' | 'SIGNED' | 'SEND_FOR_APPROVAL' | 'SEND_FOR_SIGN' | 'INIT'
export type TypeLanguage = 'KZ' | 'RU' | 'EN' | 'KZRU' | 'OTHER' | 'KZOther' | 'RUOther' | 'KZOTHER' | 'RUOTHER'
export type TypeAgreement = 'PAR' | 'CONS' | 'EMPTY'
export type TypeStatusIncoming = 'DRAFT' | 'ON_REGISTRATION' | 'REGISTERED' | 'BAD_SIGNATURE' | 'REGISTRATION_REJECTED' | 'EXECUTING' | 'EXECUTED' | 'EXPIRED' | "REGISTRATION_REJECTED"
export type TDoc = 'internal' | 'incoming' | 'order' | 'protocol' | 'outgoing'
export type TResolution = 'incoming_resolution' | 'internal_resolution' | 'order_resolution' | 'protocol_resolution'
export type TAppeals = 'appeals' | 'resolutions'

export interface Person {
    uuid: string
    id: number
    photo: string
    department:{
        uuid: string
        nameRu: string
    }
    gender: Gender
    getFullNameRu: string
    abbreviatedNameRu: string | null
    position: {
        uuid: string
        nameRu: string
    }
    departmentDirector: {
        uuid: string
        director:{
            uuid: string
            getFullNameRu: string
        }
    }[]
    user: {
        email: string
    }
    workPhone: string
    innerPhone: string
    mobilePhone: string
}

export interface UploadsFiles{
    uuid: string
    fileName: string
    fileUrl: string
}
