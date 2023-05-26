import { gql } from "@apollo/client"
import { PERSON } from "./fragment";

export const profile = gql`
        ${PERSON}
        query{
                me{
                        registrator{
                                id
                        }
                        departmentDirector{
                                director{
                                        ...Person
                                }
                                nameRu
                                profileSet{
                                        ...Person
                                }
                        }
                        department{
                                uuid
                                nameRu
                                profileSet{
                                        ...Person
                                }
                        }
                        uuid
                        getFullNameRu
                        abbreviatedNameRu
                        gender
                        birthday
                        innerPhone
                        workPhone
                        mobilePhone
                        user{
                                email
                                isStaff
                                isActive
                                isSuperuser
                        }
                        company{
                                id
                        }
                        position{
                                uuid
                                nameRu
                                userPosition{
                                        getFullNameRu
                                }
                        }
                        photo
                }
        }
`

export const update_main_info = gql`
        mutation(
                $id: UUID!
                $getFullNameRu: String
                $abbreviatedNameRu: String
                $birthday: Date
                $gender: String
                $position: UUID
                $department: UUID
        ){
                updateProfile(
                        id: $id
                        input:{
                                getFullNameRu: $getFullNameRu
                                abbreviatedNameRu: $abbreviatedNameRu
                                birthday: $birthday
                                gender: $gender
                                position: $position
                                department: $department
                        }
                ){
                        ok
                }
        }
`

export const update_electro_data = gql`
        mutation(
                $id: UUID!
                $workPhone: String
                $innerPhone: String
                $mobilePhone: String
        ){
                updateProfile(
                        id: $id
                        input:{
                                workPhone: $workPhone
                                innerPhone: $innerPhone
                                mobilePhone: $mobilePhone
                        }
                ){
                        ok
                }
        }
`

export const my_auth_signature = gql`
        query{
                myAuthSignature{
                        uuid
                        commonName
                        organization
                        iin
                        bin
                }
        }
`

export const total_all_documents = gql`
        query{
                internalDocumentResolutions{
                        totalCount
                }
                incomingDocumentResolutions{
                        totalCount
                }
                protocolResolutions{
                        totalCount
                }
                productionOrderResolutions{
                        totalCount
                }
                appealResolutions{
                        totalCount
                }
        }
`