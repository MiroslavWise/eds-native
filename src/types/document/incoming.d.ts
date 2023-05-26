import { TypeFrequency } from "../../functions/frenc"
import type { TypeStatusIncoming, Person } from "../graphql"
import type { TypeLanguage, UploadsFiles } from '../graphql'
// import type {TypeFrequency} from '../other'

interface PropsIncoming {
    incomingDocument: {
        uuid: string
        tempNumber: string
        replyTo:{
            target: any
        }[]
        id: number
        responsible: Person
        documentCreator: Person
        incomingdocumentfileSet:{
            uuid: string
            fileName: string
            fileUrl: string
        }[]
        resolutions:{
            uuid
        }[]
        correspondent: {
            uuid: string
            nameRu: string
        }
        registerNumber: {
            stringNumber: string
        } | null
        author: string | null
        originalNumber: string | null
        date: string | null
        documentType: {
            uuid: string
            nameRu: string
        } | null
        questionNature: {
            uuid: string
            nameRu: string
            code: string
        } | null
        status: TypeStatusIncoming
        frequencyOfControl:TypeFrequency // TypeFrequency
        controlType: {
            uuid: string
            code: string
            nameRu: string
        } | null
        executionDate: string | null
        language: TypeLanguage
        sheetsQuantity: number
        additionsQuantity: number
        summary: string | null
        replyingTo:{
            uuid: string
            registerNumber: {
                stringNumber: string
            }
        } | null
        incomingdocumentinternalexecutorSet: {
            person: Person
        }[]
        incomingdocumentfamiliarizationSet: {
            person: Person
        }[]
        createdAt: string
        incomingdocumentfileSet: UploadsFiles[]
    }
}
