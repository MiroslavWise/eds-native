import { gql } from "@apollo/client";
import { PERSON, SMALL_PERSON } from '../fragment'

export const resolution_list_table = gql`
        ${PERSON}
        query(
                $offset: Int
                $author: String
                $reg_num: String
                $executors: String
        ){
                productionOrderResolutions(
                        limit: 20
                        offset: $offset
                        author_GetFullNameRu_Icontains: $author
                        document_RegisterNumber_StringNumber_Icontains: $reg_num
                        productionOrderExecutors_Person_GetFullNameRu_Icontains: $executors
                ){
                        totalCount
                        results{
                                uuid
                                status
                                number
                                document{
                                        nameRu
                                        registerNumber{
                                                stringNumber
                                        }
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
                                productionOrderExecutors{
                                        productionorderresolutiondenied{
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
        ${PERSON}
        ${SMALL_PERSON}
        query($id:UUID!){
                productionOrderResolution(id:$id){
                        uuid
                        status
                        id
                        subject
                        executedDate
                        document{
                                pdfUrlRu
                                pdfUrlKz
                                periodOfExecution
                                uuid
                                registerNumber{
                                        stringNumber
                                }
                                nameRu
                                nameKz
                                author{
                                        ...SmallPerson
                                }
                                approversListOrder{
                                        person{
                                                ...SmallPerson
                                        }
                                }
                                signer{
                                        ...SmallPerson
                                }
                        }
                        number
                        text{
                                text
                        }
                        children{
                                final
                                status
                                productionOrderExecutors{
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
                                        ...Person
                                }
                        }
                        productionOrderExecutors{
                                productionorderresolutionexecution{
                                        dateOfExecution
                                }
                                productionorderresolutiondenied{
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
                }
        }
`

export const order_about = gql`
        ${PERSON}
        query($id:UUID!){
                productionOrder(id:$id){
                        id
                        tempNumber
                        ordersign{
                                uuid
                                isSigned
                                isRefused
                        }
                        pdfStatus
                        pdfUrlRu
                        pdfUrlKz
                        uuid
                        createdAt
                        periodOfExecution
                        caseIndex{
                                case
                                uuid
                                caseName
                        }
                        orderType{
                                uuid
                                nameRu
                        }
                        registerNumber{
                                stringNumber
                                counter
                                uuid
                        }
                        author{
                                ...Person
                        }
                        language
                        typeOfAgreement
                        status
                        listQuantityLetters
                        listQuantityAttachments
                        signer{
                                ...Person
                        }
                        orderreceiverSet{
                                person{
                                        ...Person
                                }
                        }
                        productionorderfamiliarizationSet{
                                person{
                                        ...Person
                                }
                        }
                        approversListOrder{
                                person{
                                        ...Person
                                }
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
                                action
                                text
                                createdAt
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
                                        action
                                }
                        }
                        nameRu
                        nameKz
                        orderfileSet{
                                uuid
                                fileName
                                fileUrl
                        }
                        approve{
                                uuid
                                approvingBy{
                                        ...Person
                                }
                                isApproved
                                isRefused
                                isActive
                        }
                        textRu{
                                url
                                id
                                fileName
                        }
                        textKz{
                                url
                                id
                                fileName
                        }
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
                        responsibleForExecute{
                                ...Person
                        }
                }
        }
`

export const doc_files = gql`
        query($id:UUID!){
                productionOrder(id: $id){
                        orderfileSet{
                                uuid
                                fileName
                                fileUrl
                        }
                }
        }
`

export const orders = gql`
        query ($offset: Int) {
                productionOrders(
                        offset: $offset
                        limit: 20
                        statusMultipleChoiceFilter: ["EXECUTED", "EXECUTING", "SIGNED"]
                ){
                        totalCount
                        results {
                                uuid
                                createdAt
                                id
                                nameRu
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
                                periodOfExecution
                                status
                                registerNumber {
                                        stringNumber
                                }
                        }
                }
        } 
`
