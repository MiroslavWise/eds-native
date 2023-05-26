import { ISmallDataPerson } from "types/resolution/general"

export type TypeNavigateDocument = "order" | "internal" | "incoming" | "protocol" | "appeal"
export type TTitleResolutionDocument = "resolutionToTheDocument" | "productionOrder" | "minutesResolution" | "internalDoc" | "protocol" | "incomingDocument"
export type TExecutorsResolution = "incomingDocumentExecutors" | "internalDocumentExecutors" | "protocolExecutors" | "productionOrderExecutors"
export type TExecutorsExecutions = "incomingdocumentresolutionexecution" | "internaldocumentresolutionexecution" | "protocolresolutionexecution" | "productionorderresolutionexecution"
export type TExecutorsDenied = "incomingdocumentresolutiondenied"| "internaldocumentresolutiondenied" | "protocolresolutiondenied" | "productionorderresolutiondenied"
export interface ITypeDoc{
        uuid: string
        registerNumber?: {
                stringNumber: string
        }
        summary?: string
        correspondent?: {
                uuid: string
                nameRu: string
        }
        originalNumber?: string
        date?: string
        replyingTo?: {
                registerNumber: {
                        stringNumber: string
                }
        }
        nameRu?: string
        nameKz?: string
        protocolsubjectSet?:{
                name: string
                text: string
                uuid: string
        }
        author?: ISmallDataPerson | string
        secretary?: ISmallDataPerson
        approversList?: {
                person: ISmallDataPerson
        }[]
        signer?: ISmallDataPerson
        approversListOrder?: {
                person: ISmallDataPerson
        }[]
        chairman?: ISmallDataPerson
}
