const COLORS = {
    main: "#0b3b7c",
    white: "#fff",
    gray: '#9297A3',
    expired: '#FF0000',
    green: 'rgba(27, 154, 24, 1)',
    bg_main: 'rgb(245,248,255)',
    black: '#222',
    warn: ' rgb(253, 122, 0)',
    secondary: 'rgb(129, 9, 177)',
    warn_dark: 'rgba(107, 142, 35, 0.7)',
}


export default COLORS

export type TAllStatus = "DRAFT"
        | "PENDING_APPROVE"
        | "APPROVED"
        | "REFUSED"
        | "SIGNED"
        | "PENDING_SIGNING"
        | "EXECUTED"
        | "EXECUTING"
        | "EXPIRED"
        | "REGISTERED"
        | "ON_REGISTRATION"
        | "SENT"
        | "SEND_ERROR"
        | 'REGISTRATION_REJECTED'
        | "ON_CHECK"
        | "CLOSED"
        | "DENIED"

export const COLOR_STATUS: Readonly<Record<TAllStatus, string>> = {
    DRAFT: '#808080',
    PENDING_APPROVE: '#00BFFF',
    APPROVED: 'rgba(0, 255, 0, 0.7)',
    REFUSED: '#FF0000',
    SIGNED: '#00008B',
    PENDING_SIGNING: '#1E90FF',
    EXECUTED: '#008000',
    EXECUTING: '#228B22',
    EXPIRED: '#DC143C',
    REGISTERED: '#006400',
    ON_REGISTRATION: '#2E8B57',
    SENT: 'rgb(46, 139, 87)',
    SEND_ERROR: 'rgb(255, 50, 32)',
    REGISTRATION_REJECTED: '#FF0000',
    ON_CHECK: "#8A2BE2",
    CLOSED: '#008000',
    DENIED: '#800000'
}

export const DATA_STATUSES = {
    DRAFT: {color: COLOR_STATUS.DRAFT, title: 'draft'},
    PENDING_APPROVE: { color: COLOR_STATUS.PENDING_APPROVE, title: 'pendingApprove' },
    APPROVED: { color:COLOR_STATUS.APPROVED, title: 'approved'},
    REFUSED: { color: COLOR_STATUS.REFUSED, title: 'refused'},
    SIGNED: { color: COLOR_STATUS.SIGNED, title: 'signedet'},
    PENDING_SIGNING: { color: COLOR_STATUS.PENDING_SIGNING, title: 'pendingSigning'},
    EXECUTED: { color: COLOR_STATUS.EXECUTED, title: "executed"},
    EXECUTING: { color: COLOR_STATUS.EXECUTING, title: "executing"},
    EXPIRED: { color: COLOR_STATUS.EXPIRED, title: "expired"},
    REGISTERED: { color: COLOR_STATUS.REGISTERED, title: "registered" },
    REGISTЕRED:  { color: COLOR_STATUS.REGISTERED, title: "registered" },
    ON_REGISTRATION: { color: COLOR_STATUS.ON_REGISTRATION, title: "onRegistration"},
    SENT: { color: COLOR_STATUS.SENT, title: "sent"},
    SEND_ERROR: { color: COLOR_STATUS.SEND_ERROR, title: "send_error" },
    REGISTRATION_REJECTED: { color: COLOR_STATUS.REGISTRATION_REJECTED, title: "registration_rejected" },
    ON_CHECK: { color: '#8A2BE2', title: 'На проверке' },
    CLOSED: { color: '#008000', title: 'Закрыта' },
    DENIED: {color: '#800000', title: 'Отправлена на доp.'}
}

export type TStatusResolution = "EXPIRED" | "DENIED" | "IN_PROCESS" | "EXECUTED" | "CREATED"

export const COLOR_STATUS_RESOLUTIONS = {
    EXPIRED: ["#DC143C", "ПРОСРОЧЕНА"],
    DENIED: ["#D2691E", "ОТКЛОНЕНА"],
    IN_PROCESS: ["#1E90FF", "НА ИСПОЛНЕНИИ"],
    EXECUTED: ["#008000", "ИСПОЛНЕНА"],
    CREATED: ["grey", "CREATED"]
}

export const COLOR_RESOLUTION_EXECUTORS = {
    default: COLORS.gray,
    primary: COLORS.main,
    success: COLORS.green,
    error: COLORS.expired,
    warning: COLORS.warn,
    secondary: COLORS.secondary,
    warn_dark: COLORS.warn_dark,
}