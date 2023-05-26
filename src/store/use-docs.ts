import { create } from "zustand"

import { IUseDocs, TListType, TFilter } from "../types/store/documents"
import { REST_API } from "assets/url"
import { axiosInstance } from "context/ContextAxios"
import { array_hash } from "functions/hash"

const status = (stat: string) => stat ? `&status=${stat}` : ''
const page = (num: number) => num ? `&page=${num}` : ''
const author = (str: string) => str ? `&author_name=${str}` : ''
const summary = (str: string) => str ? `&summary=${str}` : ''
const number = (str: string) => str ? `&number=${str}` : ''
const typesFilters = (args: string): Record<TFilter, any> => ({
        number: number(args),
        author: author(args),
        summary: summary(args)
})

export const getData = async (url: TListType, str: string): Promise<any> => {
        return await axiosInstance.get(`${REST_API[url]}${str}`)
                .then(response => ({
                        data: response?.data?.results || [],
                        total: response?.data?.count || 0
                }))
                .catch(e => console.error('ERROR LIST: ', e))
}

const useDocuments = create<IUseDocs>(
        (set, get) => ({
                page: {
                        incoming: 1,
                        outgoing: 1,
                        internal: 1,
                        protocol: 1,
                        order: 1,
                },
                status: {
                        incoming: '',
                        outgoing: '',
                        internal: '',
                        protocol: '',
                        order: '',
                },
                input: {
                        incoming: '',
                        outgoing: '',
                        internal: '',
                        protocol: '',
                        order: '',
                },
                type_filter: {
                        incoming: 'number',
                        outgoing: 'number',
                        internal: 'number',
                        protocol: 'number',
                        order: 'number',
                },

                setData: {
                        incoming() {
                                return getData(
                                        'LIST_INCOMING_DOCUMENTS',
                                        `${page(get().page.incoming)}${status(get().status.incoming)}${typesFilters(get().input.incoming)[get().type_filter.incoming]}`.replace("&", "?")
                                )
                        },
                        outgoing() {
                                return getData(
                                        'LIST_OUTGOING_DOCUMENTS',
                                        `${page(get().page.outgoing)}${status(get().status.outgoing)}${typesFilters(get().input.outgoing)[get().type_filter.outgoing]}`.replace("&", "?")
                                )
                        },
                        internal() {
                                return getData(
                                        'LIST_INTERNAL_DOCUMENTS',
                                        `${page(get().page.internal)}${status(get().status.internal)}${typesFilters(get().input.internal)[get().type_filter.internal]}`.replace("&", "?")
                                )
                        },
                        protocol() {
                                return getData(
                                        'LIST_PROTOCOLS',
                                        `${page(get().page.protocol)}${status(get().status.protocol)}${typesFilters(get().input.protocol)[get().type_filter.protocol]}`.replace("&", "?")
                                )
                        },
                        order() {
                                return getData(
                                        'LIST_ORDER',
                                        `${page(get().page.order)}${status(get().status.order)}${typesFilters(get().input.order)[get().type_filter.order]}`.replace("&", "?")
                                )
                        },
                },
                setPage: {
                        incoming(num){
                                set({
                                        page: {
                                                ...get().page,
                                                incoming: num,
                                        }
                                })
                        },
                        outgoing(num){
                                set({
                                        page: {
                                                ...get().page,
                                                outgoing: num,
                                        }
                                })
                        },
                        internal(num){
                                set({
                                        page: {
                                                ...get().page,
                                                internal: num,
                                        }
                                })
                        },
                        protocol(num){
                                set({
                                        page: {
                                                ...get().page,
                                                protocol: num,
                                        }
                                })
                        },
                        order(num){
                                set({
                                        page: {
                                                ...get().page,
                                                order: num,
                                        }
                                })
                        },
                },
                setStatus: {
                        incoming(value){
                                set({
                                        status: {
                                                ...get().status,
                                                incoming: value,
                                        }
                                })
                        },
                        outgoing(value){
                                set({
                                        status: {
                                                ...get().status,
                                                outgoing: value,
                                        }
                                })
                        },
                        internal(value){
                                set({
                                        status: {
                                                ...get().status,
                                                internal: value,
                                        }
                                })
                        },
                        protocol(value){
                                set({
                                        status: {
                                                ...get().status,
                                                protocol: value,
                                        }
                                })
                        },
                        order(value){
                                set({
                                        status: {
                                                ...get().status,
                                                order: value,
                                        }
                                })
                        },
                },
                setReset(){
                        set({
                                page: {
                                        incoming: 1,
                                        outgoing: 1,
                                        internal: 1,
                                        protocol: 1,
                                        order: 1,
                                },
                                input: {
                                        incoming: '',
                                        outgoing: '',
                                        internal: '',
                                        protocol: '',
                                        order: '',
                                },
                                type_filter: {
                                        incoming: 'number',
                                        outgoing: 'number',
                                        internal: 'number',
                                        protocol: 'number',
                                        order: 'number',
                                }
                        })
                },
                setTypeFilter: {
                        incoming(value){
                                set({
                                        type_filter: {
                                                ...get().type_filter,
                                                incoming: value,
                                        }
                                })
                        },
                        outgoing(value){
                                set({
                                        type_filter: {
                                                ...get().type_filter,
                                                outgoing: value,
                                        }
                                })
                        },
                        internal(value){
                                set({
                                        type_filter: {
                                                ...get().type_filter,
                                                internal: value,
                                        }
                                })
                        },
                        protocol(value){
                                set({
                                        type_filter: {
                                                ...get().type_filter,
                                                protocol: value,
                                        }
                                })
                        },
                        order(value){
                                set({
                                        type_filter: {
                                                ...get().type_filter,
                                                order: value,
                                        }
                                })
                        },
                },
                setInput: {
                        incoming(value){
                                set({
                                        input: {
                                                ...get().input,
                                                incoming: value,
                                        }
                                })
                        },
                        outgoing(value){
                                set({
                                        input: {
                                                ...get().input,
                                                outgoing: value,
                                        }
                                })
                        },
                        internal(value){
                                set({
                                        input: {
                                                ...get().input,
                                                internal: value,
                                        }
                                })
                        },
                        protocol(value){
                                set({
                                        input: {
                                                ...get().input,
                                                protocol: value,
                                        }
                                })
                        },
                        order(value){
                                set({
                                        input: {
                                                ...get().input,
                                                order: value,
                                        }
                                })
                        },
                },
        })
)

export default useDocuments