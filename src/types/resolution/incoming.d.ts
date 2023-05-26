import type { TStatusResolution, ISmallDataPerson, IDeniedPerson } from "./general"
import type { Person } from "../graphql"


export interface IPropsIncomingResolution {
    incomingDocumentResolution: {
        uuid: string
        id: number
        status: TStatusResolution
        subject: string
        document: {
            responsible: {
                uuid: string
            }
            uuid: string
            registerNumber: {
                stringNumber: string
            }
            correspondent: {
                uuid: string
                nameRu: string
            }
            summary: string
            originalNumber: string
            date: string
        }
        executedDate: string
        number: string
        text: {
            text: string
        }
        children: {
            final: boolean
            status: TStatusResolution
            incomingDocumentExecutors: {
                isExecuted: boolean
                isExpired: boolean
                resolution: {
                    uuid: string
                    subject: string
                    createDate: string
                    updateDate: string
                    status: TStatusResolution
                    children: {
                        uuid: string
                        executedDate: string
                        author: {
                            uuid: string
                        }
                    }[]
                }
                person: Person
            }[]
            uuid: string
            author: ISmallDataPerson
        }[]
        incomingDocumentExecutors: {
            incomingdocumentresolutionexecution: {
                dateOfExecution: string
            }
            incomingdocumentresolutiondenied: {
                createdAt: string
                isProcessed: boolean
                uuid: string
                executor: {
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
        incomingdocumentresolutiondeniedSet: IDeniedPerson[]
    }
}
