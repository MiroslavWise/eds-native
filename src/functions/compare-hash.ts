import { array_hash } from "./hash"

type TType = "messages"

const uuidArray = (value: any[], type: TType) => value?.map(item => item?.[type]?.map((mes: any) => mes?.key))?.flat()

const compareMessages = (prev: any[], next: any[], type: TType): boolean => {

    const uuid_array = uuidArray(prev, type)
    const uuidNewMessage = uuidArray(next, type)

    return array_hash(uuid_array) !== array_hash(uuidNewMessage)
}

export {compareMessages}
