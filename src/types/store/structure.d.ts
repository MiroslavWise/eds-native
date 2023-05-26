
import type { Person } from "../graphql"

export interface IStructure{
    department_people: {
        [key: string]: Person[]
    }

    setDepartmentPeople: (uuid: string ,args: Person[]) => void
}
