import type { TStatusResolution, ISmallDataPerson, deniedPerson } from "./general"
import type { Person } from "../graphql"

export interface IPropsOrderResolution {
    productionOrderResolution: {
        uuid: string
        status: TStatusResolution
        id: number
        subject: string
        executedDate: string
        document: {
            pdfUrlRu: string
            pdfUrlKz: string
            periodOfExecution: string
            uuid: string
            registerNumber: {
                stringNumber: string
            }
            nameRu: string
            nameKz: string
            author: ISmallDataPerson
            approversListOrder: {
                person: ISmallDataPerson
            }[]
            signer: SmallPerson
        }
        number: string
        text: {
            text: string
        }
        children: {
            final: boolean
            status: TStatusResolution
            productionOrderExecutors: {
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
            author: Person
        }[]
        productionOrderExecutors: {
            productionorderresolutionexecution: {
                dateOfExecution: string
            }
            productionorderresolutiondenied: {
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

        productionOrderResolutionDeniedList: IDeniedPerson[]
    }
}
