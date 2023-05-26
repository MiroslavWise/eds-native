import { DispatchWithoutAction } from 'react'

export type TTypeUrlCount = "incoming" | "outgoing" | "internal" | "protocol" | "order"

export interface ICountUrlData{

}

export interface ICurrentTotalDocs{
    incoming: {
        executed: number
        executing: number
        expired: number
        on_registration: number
        total: number
    }
    outgoing: {
        executing: number
        expired: number
        on_registration: number
        pending_approve: number
        pending_signing: number
        send_error: number
        sent: number
        total: number
    }
    internal: {
        executed: number
        executing: number
        expired: number
        pending_approve: number
        pending_signing: number
        total: number
    }
    protocol: {
        executed: number
        executing: number
        expired: number
        pending_approve: number
        pending_signing: number
        total: number
    }
    order: {
        executed: number
        executing: number
        expired: number
        pending_approve: number
        pending_signing: number
        total: number
    }
}

export interface IPropsTotal {
    internalDocumentResolutions: {
            totalCount: number
    }
    incomingDocumentResolutions: {
            totalCount: number
    }
    protocolResolutions: {
            totalCount: number
    }
    productionOrderResolutions: {
            totalCount: number
    }
}

export interface ICountDocs{
    total: ICurrentTotalDocs

    setDataCount: DispatchWithoutAction
    setResetTotal: DispatchWithoutAction
}
