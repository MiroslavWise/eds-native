import {useState, ReactNode, createContext, Dispatch, DispatchWithoutAction, FC, SetStateAction} from 'react';
import { AuthStateType } from "types/auth";

import SignIn from "./SignIn";
import GatesOfTruth from './GatesOfTruth'

import useStorage from 'store/storage';

const AuthorizationContext = createContext<{
        authState: AuthStateType
        setAuthState: Dispatch<SetStateAction<AuthStateType>>
        signOut: DispatchWithoutAction
} | undefined>(undefined);


const Authorization: FC<{children: ReactNode}> = ({ children }) => {
        const [authState, setAuthState] = useState<AuthStateType>('Gates');
        const useDelete = useStorage(state => state.useDelete)

        const Routers: Record<AuthStateType, ReactNode> = {
                Gates: <GatesOfTruth />,
                SignIn: <SignIn />,
                Main: children,
        }

        const ShowComponent = Routers[authState]

        const signOut = async () => {
                useDelete()
                setAuthState('SignIn')
        }

        return(
                <AuthorizationContext.Provider value={{
                        authState, setAuthState, signOut
                }}>
                        {ShowComponent}
                </AuthorizationContext.Provider>
        )
}

export {Authorization, AuthorizationContext}
