import type { TStatusResolution, ISmallDataPerson, IDeniedPerson } from "./general"
import type { Person } from "../graphql"



export interface IPropsProtocolResolution {
    protocolResolution: {
        uuid: string
        id: number
        status: TStatusResolution
        subject: string
        document: {
            pdfUrl: string
            uuid: string
            registerNumber: {
                stringNumber: string
            }
            protocolsubjectSet: {
                name: string
                text: string
                uuid: string
            }[]
            approversList: {
                person: ISmallDataPerson
            }[]
            secretary: ISmallDataPerson
            chairman: ISmallDataPerson
            date: string
        }
        executedDate
        number
        text: {
            text: string
        }
        children: {
            final: boolean
            status: TStatusResolution
            protocolExecutors: {
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
        protocolExecutors: {
            protocolresolutionexecution: {
                dateOfExecution: string
            }
            protocolresolutiondenied: {
                createdAt: string
                isProcessed: boolean
                uuid:string
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
        protocolresolutiondeniedSet: IDeniedPerson[]
    }
}
