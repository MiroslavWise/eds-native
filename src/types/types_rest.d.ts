import type {Gender} from './graphql'

export interface People{
    abbreviated_name_ru: string | null
    birthday: string | null
    department: string | null
    email: string
    gender: Gender
    get_full_name_ru: string
    inner_phone: string
    mobile_phone: string
    position: {
        name_ru: string
        uuid: string
    } | null
    work_phone: string | null
    uuid: string
    photo: string
}

export interface SubDepartment{
    director: People
    name_ru: string
    structure_index: string | null
    sub_departments: SubDepartment[]
    uuid: string
    employees: People[]
}

export interface PropsDataStructure{
    department_list: SubDepartment[]
    director: People
    name_ru: string
    nomenclature: string | null
}
