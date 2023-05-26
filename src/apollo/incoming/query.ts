import { gql } from "@apollo/client";
import { PERSON, SMALL_PERSON } from '../fragment'


export const doc_files = gql`
        query($id:UUID!){
                incomingDocument(id: $id){
                        incomingdocumentfileSet{
                                uuid
                                fileName
                                fileUrl
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
                incomingDocumentResolutions(
                        limit: 20
                        offset: $offset
                        author_GetFullNameRu_Icontains: $author
                        document_RegisterNumber_StringNumber_Icontains: $reg_num
                        incomingDocumentExecutors_Person_GetFullNameRu_Icontains: $executors
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
                                id
                                author{
                                        ...Person
                                }
                                subject
                                createDate
                                incomingDocumentExecutors{
                                        incomingdocumentresolutiondenied{
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

export const resolution_about = gql`
        # ${PERSON}
        query($id:UUID!){
                incomingDocumentResolution(id:$id){
                        uuid
                        id
                        status
                        subject
                        document{
                                responsible{
                                        uuid
                                }
                                author
                                uuid
                                registerNumber{
                                        stringNumber
                                }
                                correspondent{
                                        uuid
                                        nameRu
                                }
                                summary
                                originalNumber
                                date
                        }
                        executedDate
                        number
                        text{
                                text
                        }
                        children{
                                final
                                status
                                incomingDocumentExecutors{
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
                        incomingDocumentExecutors{
                                incomingdocumentresolutionexecution{
                                        dateOfExecution
                                }
                                incomingdocumentresolutiondenied{
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
                        incomingdocumentresolutiondeniedSet{
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

export const incoming_document_about = gql`
        ${PERSON}
        query($id:UUID!){
                incomingDocument(id:$id){
                        tempNumber
                        replyTo{
                                target
                        }
                        uuid
                        id
                        incomingdocumentfileSet{
                                uuid	
                                fileName
                                fileUrl
                        }
                        resolutions{
                                uuid
                        }
                        responsible{
                                ...Person 
                        }
                        documentCreator{
                                ...Person
                        }
                        author
                        correspondent{
                                uuid
                                nameRu
                        }
                        registerNumber{
                                stringNumber
                        }
                        originalNumber
                        date
                        documentType{
                                uuid
                                nameRu
                        }
                        questionNature{
                                uuid
                                nameRu
                                code
                        }
                        status
                        frequencyOfControl
                        controlType{
                                uuid
                                code
                                nameRu
                        }
                        executionDate
                        language
                        sheetsQuantity
                        additionsQuantity
                        summary
                        replyingTo{
                                uuid
                                registerNumber{
                                        stringNumber
                                }
                        }
                        incomingdocumentinternalexecutorSet{
                                person{
                                        ...Person
                                }
                        } 
                        incomingdocumentfamiliarizationSet{
                                person{
                                        ...Person
                                }
                        } 
                        createdAt
                }
        }
`

export const incoming_documents_list = gql`
        query{
                incomingDocuments{
                        totalCount
                        results{
                                registerNumber{
                                        stringNumber
                                }
                                uuid
                                id
                                documentCreator{
                                        abbreviatedNameRu
                                        position{
                                                nameRu
                                        }
                                }
                                status
                                createdAt
                                executionDate
                                summary
                        }
                }
        }

`
