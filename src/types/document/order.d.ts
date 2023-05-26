import type { Person } from "../graphql"
import type { StatusResolution } from '../types'
import type{StatusPDF, TypeLanguage, TypeAgreement, TypesAction, UploadsFiles} from '../graphql'
export type StatusOrder = "DRAFT" | "PENDING_APPROVE" | "APPROVED" | "REFUSED" | "PENDING_SIGNING" | "SIGNED" | "EXECUTING" | "EXECUTED" | "EXPIRED"
export interface PropsResolution {
    uuid: string
    id: string
    status: StatusResolution
    subject: string
    executedDate: string
    document?: {
        periodOfExecution: string
        uuid: string
        registerNumber?: {
            stringNumber: string
        } | null
    }
    number: string
    text?: {
        text: string
    }
    children?: {
        final: boolean
        status: StatusResolution
        productionOrderExecutors?: {
            isExecuted: boolean
            isExpired: boolean
            resolution?: {
                uuid: string
                subject: string
                createDate: string
                updateDate: string
                status: StatusResolution
                children?: {
                    uuid: string
                    executedDate: string
                    author?: {
                        uuid: string
                    }
                }
            }
            person: Person
        }[]
        uuid: string
        author: Person
    }[]
    productionOrderExecutors?: {
        productionorderresolutionexecution?: {
            dateOfExecution: string
        }
        productionorderresolutiondenied?: {
            createdAt: string
            isProcessed: boolean
            uuid: string
            executor?: {
                uuid: string
            }
            deniedPerson: Person
            comment: string
        }
        isExpired: boolean
        isExecuted: boolean
        uuid: string
        person: Person
    }[]
    author: Person
    productionorderresolutiondeniedSet?: {
        uuid: string
        comment: string
        createdAt: string
        deniedPerson: Person
    }[]
}

interface PropsOrderAbout{
    productionOrder: {
        tempNumber: string
        id: number
        ordersign:{
            uuid: string
            isSigned: boolean
            isRefused: boolean
        } | null
        pdfStatus: StatusPDF
        pdfUrlRu: string | null
        pdfUrlKz: string | null
        uuid: string
        createdAt: string
        periodOfExecution: string
        caseIndex: {
            case: string
            uuid: string
            caseName: string
        }
        orderType:{
            uuid: string
            nameRu: string
        }
        registerNumber: {
            stringNumber: string
            counter: string
            uuid: string
        }
        author: Person
        language: TypeLanguage
        typeOfAgreement: TypeAgreement
        status: StatusOrder
        listQuantityLetters: number
        listQuantityAttachments: number
        signer: Person
        orderreceiverSet: {
            person: Person
        }[]
        productionorderfamiliarizationSet: {
            person: Person
        }[]
        approversListOrder:{
            person: Person
            sequence: number
            uuid: string
        }[]
        history:{
            id: number
            ifRefused: boolean
            document: {
                id: number
            }
            initiatorOfAction: Person
            action: TypesAction
            text: string
            createdAt: string
        }[]
        copies:{
            version: string
            id: number
            uuid: string
            history: {
                id: number
                ifRefused: boolean
                document:{
                    id: number
                }
                initiatorOfAction: Person
                action: TypesAction
            }[]
        }[]
        nameRu: string
        nameKz: string
        orderfileSet: UploadsFiles[]
        approve: {
            uuid: string
            approvingBy: Person
            isApproved: boolean
            isRefused: boolean
            isActive: boolean
        }[]
        textRu: {
            url: string
            id: number
            fileName: string
        }
        textKz: {
            url: string
            id: number
            fileName: string
        }
        resolutions: {
            id: number
            final: boolean
            status: StatusResolution
            uuid: string
            author: Person
            executedDate: string
        } []
        responsibleForExecute: Person
    }

}
