import type { IMessages, IFile, IReturnMessages } from "types/store/type-chat";


export function joinMessages(item_messages: IMessages[]): IReturnMessages[] {
    const items = [] as IReturnMessages[]

    if (item_messages) {
        item_messages.forEach((message, index) => {
            if (items[items?.length - 1]?.uuid === message.sender?.person?.uuid) {
                items[items?.length - 1]?.messages?.push({
                    text: message?.text || '',
                    key: message?.uuid,
                    time: message?.created_at || '',
                    file: message?.files
                })
            } else {
                items.push({
                    name: message.sender?.person?.get_full_name_ru || '',
                    uuid: message?.sender?.person?.uuid || '',
                    photo: message?.sender?.person?.photo || '',
                    id: `${message?.uuid}_time`,
                    messages: [{
                        text: message?.text || '',
                        key: message?.uuid,
                        time: message?.created_at || '',
                        file: message?.files
                    }]
                })
            }
        })
    }

    return items
}
