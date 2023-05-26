export type StatusResolution = 'IN_PROCESS' | 'EXECUTED' | 'EXPIRED' | 'CREATED' | 'DENIED'
export type TTypeTabs = "main" | "preview" | "tree" | "preview-ru" | "preview-kz" | "delivery"
export interface Props{
    title?: string
    dataIndex?: string | any
    width?: string | number
    render?: any | null
}

export interface DataType {
    title: string | Element
    dataIndex: any
    render: (args: any) => FC
    width?: string | number
    align?: string
}

export interface PropsFilter<T> {
    onSearch: (args: any) => void
    onDownLoad: (args: any) => void
    total: number
    createObject: {
        right: boolean
        function: () => void
        loading: boolean
    }
    load_search: boolean
    load_download: boolean,
    active: T
}

export interface DataResolutionsInternals{
    uuid: string
    status: StatusResolutions
    document: {
        registerNumber?:{
            stringNumber: string
        }
        summary: string
    }
    number: string
    executedDate: string
    parentResolution?: {
        uuid: string
    } | null
    id: number
    author: {
        uuid: string
        getFullNameRu: string
        abbreviatedNameRu: string | null
        position: {
            nameRu?: string
        }
    }
    subject: string
    createDate: string
    internalDocumentExecutors: {
        internaldocumentresolutiondenied: {
            uuid: string
        }
        uuid: string
        isExecuted: boolean
        isExpired: boolean
        person: {
            uuid: string
            getFullNameRu: string | null
            abbreviatedNameRu: string | null
            position: {
                nameRu: string | null
            }
            department: {
                nameRu: string | null
            }
        }
    }[]
    children?: {
        uuid: string
        author: {
            uuid: string
            abbreviatedNameRu: string | null
            getFullNameRu: string | null
        }
    }
}


export interface ITabsNavigation {
    name: string
    component: any
    icon?: any
}