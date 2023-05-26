export type TLinkUpload = "internal_upload" | "outgoing_upload" | "protocol_upload" | "order_upload" | 'incoming_upload' | "help_upload"
export type TLinkFinish = "internal_finish" | "outgoing_finish" | "protocol_finish" | "order_finish" | 'incoming_finish' | 'help_finish'
export type TLinkDelete = "internal_delete" | "outgoing_delete" | "protocol_delete" | "order_delete" | 'incoming_delete' | 'help_delete'

export type TLink = TLinkUpload | TLinkFinish | TLinkDelete
