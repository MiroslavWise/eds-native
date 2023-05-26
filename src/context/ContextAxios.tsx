import { FC, ReactNode, createContext, useEffect, useContext } from "react"
import axios, { AxiosInstance } from "axios"
import useStorage from "store/storage"
import { BASE_URL } from "assets/url"

const CreateAxios = createContext<{ axios: AxiosInstance } | undefined>(undefined)

const axiosInstance = axios.create({
        baseURL: `${BASE_URL}/api/`,
})

const ProviderAxios: FC<{ children: ReactNode }> = ({ children }) => {
        const token = useStorage(state => state.token)

        useEffect(() => {
                axiosInstance.interceptors.request.use((config: any) => {
                        const newConfig = { ...config }
                        newConfig.headers = {
                                'Authorization' : `JWT ${token}`
                        }
                        return newConfig
                })
        }, [token])

        return (
                <CreateAxios.Provider value={{axios: axiosInstance}}>
                        {children}
                </CreateAxios.Provider>
        )
}

const useAxios = () => {
        const context = useContext(CreateAxios);
        if (context === undefined) {
                throw new Error('useAuth must be used within a Authorization Provider');
        }
        return context;
}

export { ProviderAxios, useAxios, axiosInstance }