import { create } from "zustand";

import type { IFilter, IFilterFields, TTypeFilter } from "types/store/resolutions";

export const objectFilter = (type: TTypeFilter, input: string): IFilterFields  => ({
        reg_num: type === 'reg_num' ? input : '',
        author: type === 'author' ? input : '',
        executors: type === 'executors' ? input : '',
})

export const useResolution = create<IFilter>(
        (set, get) => ({
                page: {
                        incomings: 1,
                        internals: 1,
                        protocols: 1,
                        orders: 1,
                },
                input: {
                        incomings: "",
                        internals: "",
                        protocols: "",
                        orders: "",
                },
                type_filter: {
                        incomings: "reg_num",
                        internals: "reg_num",
                        protocols: "reg_num",
                        orders: "reg_num",
                },
                object_filter: {
                        incomings: {
                                reg_num: '',
                                author: '',
                                executors: ''
                        },
                        internals: {
                                reg_num: '',
                                author: '',
                                executors: ''
                        },
                        protocols: {
                                reg_num: '',
                                author: '',
                                executors: ''
                        },
                        orders: {
                                reg_num: '',
                                author: '',
                                executors: ''
                        },
                },
                setPage: {
                        incomings(value) {
                                set({
                                        page: {
                                                ...get().page,
                                                incomings: value,
                                        }
                                })
                        },
                        internals(value) {
                                set({
                                        page: {
                                                ...get().page,
                                                internals: value,
                                        }
                                })
                        },
                        protocols(value) {
                                set({
                                        page: {
                                                ...get().page,
                                                protocols: value,
                                        }
                                })
                        },
                        orders(value) {
                                set({
                                        page: {
                                                ...get().page,
                                                orders: value,
                                        }
                                })
                        },
                },
                setInput: {
                        incomings(value) {
                                set({
                                        input: {
                                                ...get().input,
                                                incomings: value,
                                        }
                                })
                        },
                        internals(value) {
                                set({
                                        input: {
                                                ...get().input,
                                                internals: value,
                                        }
                                })
                        },
                        protocols(value) {
                                set({
                                        input: {
                                                ...get().input,
                                                protocols: value,
                                        }
                                })
                        },
                        orders(value) {
                                set({
                                        input: {
                                                ...get().input,
                                                orders: value,
                                        }
                                })
                        },
                },
                setTypeFilter: {
                        incomings(value) {
                                set({
                                        type_filter: {
                                                ...get().type_filter,
                                                incomings: value,
                                        }
                                })
                        },
                        internals(value) {
                                set({
                                        type_filter: {
                                                ...get().type_filter,
                                                internals: value,
                                        }
                                })
                        },
                        protocols(value) {
                                set({
                                        type_filter: {
                                                ...get().type_filter,
                                                protocols: value,
                                        }
                                })
                        },
                        orders(value) {
                                set({
                                        type_filter: {
                                                ...get().type_filter,
                                                orders: value,
                                        }
                                })
                        }
                },
                onSearch: {
                        incomings() {
                                set({
                                        object_filter: {
                                                ...get().object_filter,
                                                ...objectFilter(get().type_filter.incomings, get().input.incomings)
                                        },
                                        page: {
                                                ...get().page,
                                                incomings: 1,
                                        },
                                })
                        },
                        internals() {
                                set({
                                        object_filter: {
                                                ...get().object_filter,
                                                ...objectFilter(get().type_filter.internals, get().input.internals)
                                        },
                                        page: {
                                                ...get().page,
                                                internals: 1,
                                        },
                                })
                        },
                        protocols() {
                                set({
                                        object_filter: {
                                                ...get().object_filter,
                                                ...objectFilter(get().type_filter.protocols, get().input.protocols)
                                        },
                                        page: {
                                                ...get().page,
                                                protocols: 1,
                                        },
                                })
                        },
                        orders() {
                                set({
                                        object_filter: {
                                                ...get().object_filter,
                                                ...objectFilter(get().type_filter.orders, get().input.orders)
                                        },
                                        page: {
                                                ...get().page,
                                                orders: 1,
                                        },
                                })
                        },
                },
        })
)