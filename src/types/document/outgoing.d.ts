import type { Person, TypeDocuments, StatusOutgoing, StatusPDF, TypesAction, TypeLanguage, TypeAgreement, UploadsFiles } from '../graphql'
export type TStatusDeliver = string

export interface IDeviler{
    uuid: string
    status: TStatusDeliver
    correspondent:{
        uuid: string
        nameRu: string
    }
    deliveredAt: string
    rejectionReason: string
    registrationNumber: string
    registrationDate: string
    executionDate: string
    executionDateFactual: string
    executor: string
    executorPhone: string
}
export interface TypesOutgoingDocument {
    outgoingDocument: {
        typeName: TypeDocuments
        tempNumber: string
        pdfUrl: string | null
        replyingTo?: {
            uuid: string
            id: number
            registerNumber?: {
                stringNumber: string
            } | null
        }
        pdfStatus: StatusPDF
        uuid: string
        version: string
        documentCreator?: Person
        id: number
        copies:{
            version: string
            history?: {
                id: number
                createdAt: string
                ifRefused: boolean
                document?: {
                    id: number
                    uuid: string
                }
                initiatorOfAction?: Person
                action: TypesAction
                text: string
            }
        }[]
        history?: {
            createdAt: string
            id: number
            ifRefused: boolean
            document:{
                id: number
                uuid: string
            }
            initiatorOfAction: Person
            action: TypesAction
            text: string
        }[]
        outgoingdocumentsign:{
            uuid: string
            signer: Person
        }
        approversList:{
            uuid: string
            person: Person
            sequence: number
        }[]
        documentType: {
            uuid: string
            nameRu: string
        }
        registerNumber?:{
            stringNumber: string
        }
        questionNature?:{
            uuid: string
            nameRu: string
        }
        author: Person
        caseIndex?:{
            case: string
            uuid: string
            caseName: string
        }
        language: TypeLanguage
        sheetsQuantity: number
        additionsQuantity: number
        signer?: Person
        typeOfAgreement: TypeAgreement
        summary: string | null
        status: StatusOutgoing
        outgoingdocumentreceiverSet:{
            correspondent: {
                uuid: string
                nameRu: string
            }
        }[]
        outgoingdocumentfileSet: UploadsFiles[]
        approve: {
            uuid: string
            isActive: boolean
            approvingBy: Person
        }[]
        registration: {
            registeredBy: Person
        }
        outgoingdocumentdeliverSet: IDeviler[]
        replyTo: {
            id: string
            sourceObjectId: string
            targetObjectId: string
            target: any
        }[]
    }

}
