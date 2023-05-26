import Config from 'react-native-config';

export const BASE_URL = "https://api.bridgedoc.kz"
export const WEB_SOCKET_URL = "wss://api.bridgedoc.kz/ws"

export const REST_API = {
        LIST_INTERNAL_DOCUMENTS: `${BASE_URL}/api/internal-documents`,
        LIST_INTERNAL_DOCUMENTS_EXPORT: `${BASE_URL}/api/internal-documents/export`,
        LIST_OUTGOING_DOCUMENTS: `${BASE_URL}/api/outgoing-documents`,
        LIST_OUTGOING_DOCUMENTS_EXPORT: `${BASE_URL}/api/outgoing-documents/export`,
        LIST_ORDER: `${BASE_URL}/api/production-orders`,
        LIST_ORDER_EXPORT: `${BASE_URL}/api/production-orders/export`,
        LIST_PROTOCOLS: `${BASE_URL}/api/protocols`,
        LIST_PROTOCOLS_EXPORT: `${BASE_URL}/api/protocols/export`,
        LIST_INCOMING_DOCUMENTS: `${BASE_URL}/api/incoming-documents`,
        LIST_INCOMING_DOCUMENTS_EXPORT: `${BASE_URL}/api/incoming-documents/export`,
        LIST_APPEALS: `${BASE_URL}/api/appeals`
}