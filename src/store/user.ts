import { create } from 'zustand'

import type { IUser } from '../types/store/notifications'

const useUser = create<IUser>(
        (set, get) => ({
                uuid: undefined,
                user: undefined,
                loading: false,
                isDirector: undefined,

                refetch() {
                        return Promise.resolve('')
                },
                setUserData(args) {
                        if (args) {
                                set({
                                        user: args,
                                        uuid: args?.me?.uuid,
                                        isDirector: args?.me?.departmentDirector?.some((item: any) => item?.director?.uuid === args?.me?.uuid),
                                })
                        }
                },
                setLoading: (args) => { set({ loading: args }) },
                setUserReset: () => { set({ user: undefined, uuid: undefined, isDirector: undefined }) },
                setRefetch: (cb) => { set({ refetch: cb }) },
        })
)

export default useUser