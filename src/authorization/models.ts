import { useContext } from "react"

import { AuthorizationContext } from './index'

export const useAuth = () => {
        const context = useContext(AuthorizationContext);

        if (context === undefined) {
                throw new Error('useAuth must be used within a Authorization Provider');
        }

        return context;
}