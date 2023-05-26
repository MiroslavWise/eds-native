import { gql } from "@apollo/client"
import { PERSON } from './fragment'

const handbook = {
        casein: gql`
                query{
                        caseIndexes{
                                results{
                                        uuid
                                        case
                                        department{
                                                nameRu
                                        }
                                        caseName
                                }
                        }
                }
        `,
        control: gql`
                query{
                        controlTypes{
                                results{
                                        uuid
                                        code
                                        nameRu
                                        nameKz
                                }
                        }
                }
        `,
        correspondent: gql`
                query($offset: Int, $name: String){
                        correspondents(
                                limit: 20
                                offset: $offset
                                nameRu_Icontains: $name
                        ){
                                totalCount
                                results{
                                        uuid
                                        nameRu
                                        nameKz
                                        code
                                }
                        }
                }
        `,
        correspondent_search: gql`
                query($search: String){
                        correspondents(
                                nameRu_Icontains:$search
                        ){
                                totalCount
                                results{
                                        uuid
                                        nameRu
                                        nameKz
                                        abbrRu
                                }
                        }
                }
        `,
        correspondent_search_uuid: gql`
                query($uuid: UUID){
                        correspondents(
                                uuid:$uuid
                        ){
                                totalCount
                                results{
                                        uuid
                                        nameRu
                                        nameKz
                                        abbrRu
                                }
                        }
                }
        `,
        doctype: gql`
                query(
                        $offset: Int
                        $name: String
                        ){
                        documentTypes(
                                limit: 20
                                offset: $offset
                                nameRu_Icontains: $name
                        ){
                                totalCount
                                results{
                                        isInternal
                                        isOutgoing
                                        isProtocol
                                        isIncoming
                                        isProductionOrder
                                        
                                        uuid
                                        nameRu
                                        nameKz
                                }
                        }
                }
        `,
        doctype_name: gql`
                query($name: String){
                        documentTypes(nameRu_Icontains: $name){
                                totalCount
                                results{
                                        isInternal
                                        isOutgoing
                                        isProtocol
                                        isIncoming
                                        isProductionOrder
                                        
                                        uuid
                                        nameRu
                                        nameKz
                                }
                        }
                }
        `,
                doctype_uuid: gql`
                query($uuid: UUID){
                        documentTypes(uuid: $uuid){
                                totalCount
                                results{
                                        isInternal
                                        isOutgoing
                                        isProtocol
                                        isIncoming
                                        isProductionOrder
                                        
                                        uuid
                                        nameRu
                                        nameKz
                                }
                        }
                }
        `,
        nomenclature: gql`
                query{
                        nomenclatures{
                                results{
                                        uuid
                                        code
                                        nameRu
                                        nameKz
                                }
                        }
                }
        `,
        position: gql`
                query{
                        positions{
                                results{
                                        uuid
                                        code
                                        nameRu
                                        nameKz
                                }
                        }
                }
        `,
        question: gql`
                query(
                        $offset: Int
                        $name: String
                ){
                        natureQuestions(
                                limit: 20
                                offset: $offset
                                nameRu_Icontains: $name
                        ){
                                totalCount
                                results{
                                        uuid
                                        code
                                        nameRu
                                        nameKz
                                }
                        }
                }
        `,
        question_name: gql`
                query($name: String){
                        natureQuestions(
                                nameRu_Icontains: $name
                        ){
                                totalCount
                                results{
                                        uuid
                                        code
                                        nameRu
                                        nameKz
                                }
                        }
                }
        `,
        question_uuid: gql`
                query($uuid: UUID){
                        natureQuestions(
                                uuid: $uuid
                        ){
                                totalCount
                                results{
                                        uuid
                                        code
                                        nameRu
                                        nameKz
                                }
                        }
                }
        `,
        protocol_types: gql`
                query{
                        protocolTypes{
                                results{
                                        uuid
                                        nameRu
                                }
                        }
                }
        `,
        orders_types: gql`
                query{
                        productionOrderTypes{
                                results{
                                        nameRu
                                        uuid
                                }
                        }
                }
        `,
        appeal_types: gql`
                query{
                        appealTypes{
                                results{
                                        uuid
                                        code
                                        nameRu
                                }
                        }
                }
        `,
        appeal_forms: gql`
                query{
                        appealForms{
                                results{
                                        uuid
                                        code
                                        nameRu
                                }
                        }
                }
        `,
        appeal_characters: gql`
                query{
                        appealCharacters{
                                results{
                                        uuid
                                        code
                                        nameRu
                                }
                        }
                }
        `,
        appeal_author_statuses: gql`
                query{
                        appealAuthorStatuses{
                                results{
                                        uuid
                                        code
                                        nameRu
                                }
                        }
                }
        `,
        departments: gql`
                query{
                        departments{
                                results{
                                        uuid
                                        nameRu
                                }
                        }
                }
        `,
}

export const people_department = gql`
        ${PERSON}
        query($id: UUID){
                department(id: $id){
                        employees{
                                ...Person
                        }
                }
        }
`

export default handbook