import { create } from "zustand"

import type { IStorage } from "types/store/storage"

import { clientLogin } from "helpers/auth-init"

const useStorage = create<IStorage>(
        (set, get) => ({
                token: null,
                refreshToken: null,

                async useLogin({ email, password }) {
                        try {
                                const { data: { login: { token, refreshToken } } } = await clientLogin(email, password)
                                if (token && refreshToken) {
                                        set({
                                                token: token,
                                                refreshToken: refreshToken,
                                        })
                                        return {
                                                login: true
                                        }
                                }
                                return {
                                        login: false
                                }
                        } catch (e) {
                                console.error("error login: ", e)
                                return {
                                        login: false
                                }
                        }
                },
                useDelete() {
                        set({
                                token: null,
                                refreshToken: null,
                        })
                },
        })
)

export default useStorage