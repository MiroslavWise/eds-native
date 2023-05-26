export interface ICardProps{
        label: string
        img: string | any
        total: number
        other: [string, number][]
        path: string
}

export interface IPropsItemsEDS {
        title: string
        items: ICardProps[]
}