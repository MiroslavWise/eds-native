import { gql } from "@apollo/client";
import { PERSON } from '../fragment'

export const outgoings_documents = gql`
    query ($offset: Int) {
        outgoingDocuments(offset: $offset, limit: 20) {
            totalCount
            results {
                uuid
                createdAt
                id
                author {
                    uuid
                    getFullNameRu
                    position {
                        nameRu
                    }
                    department {
                        nameRu
                    }
                }
                status
                registerNumber {
                    updateDate
                    stringNumber
                }
            }
        }
    }

`

export const outgoing_document_about = gql`
        ${PERSON}
        query($id: UUID!){
            outgoingDocument(id: $id){
                typeName
                tempNumber
                pdfUrl
                replyingTo{
                    uuid
                    id
                    registerNumber{
                        stringNumber
                    }
                }
                pdfStatus
                uuid
                version
                documentCreator{
                            ...Person
                }
                id
                copies{
                    version
                    history{
                        id
                        createdAt
                        ifRefused
                        document{
                        id
                        uuid
                    }
                    initiatorOfAction{
                            ...Person
                    }
                    action
                    text
                }
                }
                history{
                    createdAt
                    id
                    ifRefused
                    document{
                        id
                        uuid
                    }
                    initiatorOfAction{
                            ...Person
                    }
                    action
                    text
                }
                outgoingdocumentsign{
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
                approversList{
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
                    nameRu
                }
                author{
                    ...Person
                }
                caseIndex{
                    case
                    uuid
                    caseName
                }
                language
                sheetsQuantity
                additionsQuantity
                signer{
                    ...Person
                }
                outgoingdocumentfileSet{
                    uuid
                    fileName
                    fileUrl
                }
                typeOfAgreement
                summary
                status
                outgoingdocumentreceiverSet{    
                    correspondent{
                        uuid
                        nameRu
                    }
                }
                approve{
                    isActive
                    uuid
                    approvingBy{
                            ...Person
                    }
                }
                registration{
                    registeredBy{
                        ...Person
                    }
                }
                outgoingdocumentdeliverSet{
                    uuid
                    status
                    correspondent{
                        uuid
                        nameRu
                    }
                    deliveredAt
                    rejectionReason
                    registrationNumber
                    registrationDate
                    executionDate
                    executionDateFactual
                    executor
                    executorPhone
                }
            }
        }
`

export const doc_files = gql`
    query($id:UUID!){
        outgoingDocument(id: $id){
            outgoingdocumentfileSet{
                uuid
                fileName
                fileUrl
            }
        }
    }
`
