import { TTypeUrlCount } from "../../types/store/total-count";
import { BASE_URL } from "../url";

export const COUNT_DOCUMENTS: Record<TTypeUrlCount, string> = {
        incoming: `${BASE_URL}/api/incoming-documents/count`,
        outgoing: `${BASE_URL}/api/outgoing-documents/count`,
        internal: `${BASE_URL}/api/internal-documents/count`,
        protocol: `${BASE_URL}/api/protocols/count`,
        order: `${BASE_URL}/api/production-orders/count`,
}