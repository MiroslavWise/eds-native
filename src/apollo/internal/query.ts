import { gql } from "@apollo/client";
import {PERSON, SMALL_PERSON} from '../fragment'


export interface ItemInternal{
        uuid: string
        id: number
        createdAt: string
        summary: string
        author: {
                uuid: string
                getFullNameRu: string
                position: {
                        nameRu: string
                }
                department:{
                        nameRu: string
                }
        }
        periodOfExecution: string
        status: string
        registerNumber: {
                stringNumber : string
        } | null
}
export interface PropsInternals {
        totalCount: number
        results: ItemInternal[]
}

export const internal_documents = gql`
        query(
                $offset: Int
        ){
                internalDocuments(
                        offset: $offset
                        limit: 20
                        statusMultipleChoiceFilter: ["EXECUTED", "EXECUTING", "SIGNED"]
                ){
                        totalCount
                        results{
                                uuid
                                createdAt
                                id
                                summary
                                author{
                                        uuid
                                        getFullNameRu
                                        position{
                                                nameRu
                                        }
                                        department{
                                                nameRu
                                        }
                                }
                                periodOfExecution
                                status
                                registerNumber{
                                        stringNumber
                                }
                        }
                }
        }
`

export const internal_document_about = gql`
        ${PERSON}
        query($id: UUID!){
                internalDocument(id: $id){
                        typeName
                        tempNumber
                        pdfUrl
                        pdfStatus
                        documentCreator{
                                ...Person
                        }
                        uuid
                        version
                        resolutions{
                                id
                                final
                                status
                                uuid
                                author{
                                        ...Person
                                }
                                executedDate
                        }
                        history{
                                id
                                ifRefused
                                document{
                                        id
                                }
                                initiatorOfAction{
                                        ...Person
                                }
                                createdAt
                                action
                                text
                        }
                        id
                        note
                        internaldocumentsign{
                                uuid
                                signer{
                                        ...Person
                                }
                        }
                        approve{
                                isActive
                                uuid
                                approvingBy{
                                        ...Person
                                }
                        }
                        internaldocumentreceiverSet{
                                uuid
                                person{
                                        ...Person
                                }
                        }
                        approversList{
                                sequence
                                uuid
                                person{
                                        ...Person
                                }
                        }
                        documentType{
                                uuid
                                nameRu
                        }
                        registerNumber{
                                stringNumber
                        }
                        questionNature{
                                uuid
                                code
                                nameRu
                                nameKz
                        }
                        author{
                                ...Person
                        }
                        caseIndex{
                                uuid
                                caseName
                                case
                                department{
                                        uuid
                                        nameRu
                                }
                        }
                        language
                        signer{
                                ...Person
                        }
                        typeOfAgreement
                        summary
                        status
                        periodOfExecution
                        internaldocumentfileSet{
                                uuid
                                fileName
                                fileUrl
                        }
                        copies{
                                version
                                id
                                uuid
                                history{
                                        id
                                        ifRefused
                                        document{
                                                id
                                        }
                                        initiatorOfAction{
                                                ...Person
                                        }
                                        createdAt
                                        action
                                }
                        }
                }
        }
`

export const resolution_about = gql`
        ${PERSON}
        ${SMALL_PERSON}
        query($id:UUID!){
                internalDocumentResolution(id:$id){
                        uuid
                        id
                        status
                        subject
                        document{
                                uuid
                                pdfUrl
                                registerNumber{
                                        stringNumber
                                }
                                summary
                                author{
                                        ...SmallPerson
                                }
                                approversList{
                                        person{
                                                ...SmallPerson
                                        }
                                }
                                signer{
                                        ...SmallPerson
                                }
                        }
                        executedDate
                        number
                        text{
                                text
                        }
                        children{
                                final
                                status
                                internalDocumentExecutors{
                                        isExecuted
                                        isExpired
                                        resolution{
                                                uuid
                                                subject
                                                createDate
                                                updateDate
                                                status
                                                children{
                                                        uuid
                                                        executedDate
                                                        author{
                                                                uuid
                                                        }
                                                }
                                        }
                                        person{
                                                ...Person
                                        }
                                }
                                uuid
                                author{
                                        abbreviatedNameRu
                                        uuid
                                        }
                                }
                        internalDocumentExecutors{
                                internaldocumentresolutionexecution{
                                        dateOfExecution
                                }
                                internaldocumentresolutiondenied{
                                        createdAt
                                        isProcessed
                                        uuid
                                                executor{
                                                        uuid
                                                }
                                                deniedPerson{
                                                        ...Person
                                                }
                                        comment
                                }
                                isExpired
                                isExecuted
                                uuid
                                person{
                                        ...Person
                                }
                        }
                        author{
                                ...Person
                        }
                        internaldocumentresolutiondeniedSet{
                                uuid
                                comment
                                createdAt
                                deniedPerson{
                                        ...Person
                                }
                        }
                }
        }
`

export const resolution_text = gql`
        query{
                resolutionTexts{
                        results{
                                uuid
                                text
                        }
                }
        }
`

export const resolution_list_table = gql`
        ${PERSON}
        query(
                $offset: Int
                $author: String
                $reg_num: String
                $executors: String
                ){
                internalDocumentResolutions(
                        limit: 20
                        offset: $offset
                        author_GetFullNameRu_Icontains: $author
                        document_RegisterNumber_StringNumber_Icontains: $reg_num
                        internalDocumentExecutors_Person_GetFullNameRu_Icontains: $executors
                ){
                        totalCount
                        results{
                                uuid
                                status
                                document{
                                        registerNumber{
                                                stringNumber
                                        }
                                        summary
                                }
                                number
                                executedDate
                                parentResolution{
                                        uuid
                                }
                                text{
                                        text
                                        uuid
                                }
                                id
                                author{
                                        ...Person
                                }
                                subject
                                createDate
                                internalDocumentExecutors{
                                        internaldocumentresolutiondenied{
                                                uuid
                                        }
                                        uuid
                                        isExecuted
                                        isExpired
                                        person{
                                                ...Person
                                        }
                                }
                                children{
                                        uuid
                                        author{
                                                ...Person
                                        }
                                }
                        }
                }
        }
`

export const doc_files = gql`
        query($id:UUID!){
                internalDocument(id: $id){
                        internaldocumentfileSet{
                                uuid
                                fileName
                                fileUrl
                        }
                }
        }
`
