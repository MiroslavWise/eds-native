import type { Person } from "../graphql"
export type TStatusResolution = "CREATED" | "IN_PROCESS" | "EXECUTED" | "EXPIRED" | "DENIED"

export interface ISmallDataPerson{
    getFullNameRu: string
    uuid: string
    position: {
        uuid: string
        nameRu: string
    }
}

export interface IDeniedPerson{
    uuid: string
    comment: string
    createdAt: string
    deniedPerson: Person
}
