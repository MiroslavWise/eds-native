import type { TStatusResolution, ISmallDataPerson, IDeniedPerson } from "./general"
import type { Person } from "../graphql"

export interface IPropsInternalResolution {
    internalDocumentResolution: {
        uuid: string
        id: number
        status: TStatusResolution
        subject: string
        document: {
            uuid: string
            pdfUrl: string | null
            registerNumber: {
                stringNumber: string
            }
            summary: string
            author: ISmallDataPerson
            approversList: {
                person: ISmallDataPerson
            }[]
            signer: ISmallDataPerson
        }
        executedDate: string
        number: string
        text: {
            text: string
        }
        children: {
            final: boolean
            status: TStatusResolution
            internalDocumentExecutors: {
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
            author: {
                abbreviatedNameRu: string
                uuid: string
            }
        }[]
        internalDocumentExecutors: {
            internaldocumentresolutionexecution: {
                dateOfExecution: string
            }
            internaldocumentresolutiondenied: {
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
        internaldocumentresolutiondeniedSet: IDeniedPerson[]
    }
}
