import type { Person, Gender } from "./graphql"

export interface User {
    me: {
        registrator: {
            id: number
        } | null
        departmentDirector: {
            director: Person
            nameRu: string
            profileSet: Person[]
        }[]
        department: {
            uuid: string
            nameRu: string
            profileSet: Person[]
        }
        uuid: string
        getFullNameRu: string | null
        abbreviatedNameRu: string | null
        gender: Gender
        birthday: string | null
        innerPhone: string | null
        workPhone: string | null
        mobilePhone: string | null
        user: {
            email: string
            isStaff: boolean
            isActive: boolean
            isSuperuser: boolean
        }
        company: {
            id: number
        } | null
        position: {
            uuid: string
            nameRu: string
            userPosition: {
                getFullNameRu: string
            }[]
        } | null
        photo: string
    }
}

export interface TypesSignature{
    myAuthSignature: {
        uuid: string
        commonName: string
        organization: string
        iin: string
        bin: string
    } | null
}
