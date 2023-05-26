import type { Person, TypeDocuments, StatusOutgoing, StatusPDF, TypesAction, TypeLanguage, TypeAgreement, UploadsFiles } from '../graphql'
export type StatusProtocol = 'DRAFT' | 'PENDING_APPROVE' | 'APPROVED' | 'REFUSED' | 'PENDING_SIGNING' | 'EXECUTING' | 'EXECUTED' | 'EXPIRED'

export interface DataProtocolProps{
    protocol: {
        id: number
        tempNumber: string
        location: string
        pdfUrl: string | null
        pdfStatus: StatusPDF
        protocolfileSet:UploadsFiles[]
        approve:{
            uuid: string
            isApproved: boolean
            isActive: boolean
            isRefused: boolean
            approvingBy:{
                uuid:string
            }
        }[]
        protocolagendaSet:{
            uuid: string
            text: string
        }[]
        typeOfProtocol:{
            uuid: string
            nameRu: string
        }
        invited: string
        protocolsign:{
            uuid: string
            signer: Person
        } | null
        date: string
        validFrom: string
        protocolattendedSet: {
            person: Person
        }[]
        periodOfExecution: string
        approversList:{
            uuid: string
            person: Person
        }[]
        typeOfAgreement: TypeAgreement
        uuid: string
        status: StatusProtocol
        createDate: string
        typeName: TypeDocuments
        secretary: Person
        chairman: Person
        approversList:{
            person: Person
        }[]
        history:{
            id: number
            ifRefused: boolean
            document:{
                id: number
            }
            initiatorOfAction: Person
            action: TypesAction
            text: string
        }[]
        copies:{
            version: string
            id: number
            uuid: string
            history:{
                id: number
                ifRefused: boolean
                document:{
                    id: number
                }
                initiatorOfAction: Person
                action: TypesAction
            }[]
        }[]
        registerNumber:{
            stringNumber: string
        } | null
        version: string
        resolutions:{
            number: string
            id: number
            text:{
                uuid: string
                text: string
            }
            parentResolution:{
                uuid: string
            }
            uuid: string
            subject: string
            agenda:{
                text: string
                uuid: string
            }
            protocolExecutors:{
                person: Person
            }[]
            executedDate: string
            protocolSubject:{
                uuid: string
                name: string
                text: string
            }
        }[]
        protocolsubjectSet:{
            uuid: string
            text: string
            name: string
            speaker: Person
        }[]
        responsibleForExecute: Person
    }

}
