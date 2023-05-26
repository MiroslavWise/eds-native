export interface IPreview{
    link: string
    class_doc: string
    name: string

    setLink: (args: string, type: string, name: string) => void
}
