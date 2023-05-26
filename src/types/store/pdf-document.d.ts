export type TDocumentLink = "internal-document" | "production-order" | "outgoing-document" | "protocol"

export interface IPdf{
    link: {
        [key: string]: string
    }

    setLink(uuid: string, type: TDocumentLink): void
}
