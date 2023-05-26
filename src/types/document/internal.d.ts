import type { Person, TypeDocuments, StatusOutgoing, StatusPDF, TypesAction, TypeLanguage, TypeAgreement, UploadsFiles } from '../graphql'
import type { StatusResolution } from '../types'
export type TypeStatusInternal = 'DRAFT' | 'PENDING_APPROVE' | 'APPROVED' | 'REFUSED' | 'PENDING_SIGNING' | 'SIGNED' | 'EXECUTING' | 'EXECUTED' | 'EXPIRED'

interface PropsInternalDocument{
    internalDocument: {
        typeName: string
        tempNumber: string
        pdfUrl: string | null
        pdfStatus: StatusPDF
        documentCreator: Person
        uuid: string
        version: number
        resolutions: {
            id: number
            final: boolean
            status: StatusResolution
            uuid: string
            author: Person
            executedDate: string
        }[]
        history: {
            id: number
            ifRefused
            document: {
                id: number
            }
            initiatorOfAction: Person
            createdAt: string
            action: TypesAction
            text: string
        }[]
        id: number
        note: string | null
        internaldocumentsign: {
            uuid: string
            signer: Person
        } | null
        approve: {
            isActive: boolean
            uuid: string
            approvingBy: Person
        }[]
        internaldocumentreceiverSet: {
            uuid: string
            person: Person
        }[]
        approversList: {
            sequence: number
            uuid: string
            person: Person
        }[]
        documentType: {
            uuid: string
            nameRu: string
        } | null
        registerNumber: {
            stringNumber: string
        } | null
        questionNature: {
            uuid: string
            code: string
            nameRu: string
            nameKz: string
        } | null
        author: Person
        caseIndex: {
            uuid: string
            caseName: string
            case: string
            department: {
                uuid: string
                nameRu: string
            }
        } | null
        language: TypeLanguage
        signer: Person
        typeOfAgreement: TypeAgreement
        summary: string
        status: TypeStatusInternal
        periodOfExecution: string | null
        internaldocumentfileSet: UploadsFiles[]
        copies: {
            version: number
            id: number
            uuid: string
            history: {
                id: number
                ifRefused: boolean
                document: {
                    id: number
                }
                initiatorOfAction: Person
                createdAt: string
                action: TypesAction
            }[]
        }[]
    }
}
