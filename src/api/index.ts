import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
    FetchArgs,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import {
    createApi,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

interface IGetPerson {
    page?: number | null
    resultPerPage?: number | null
    searchValue: string
}

interface IDataPerson {
    forename: string
    date_of_birth: string
    entity_id: string
    nationalities: string[]
    _links: {
        thumbnail?: {
            href: string
        }
    }
}

interface DataDetail extends IDataPerson {
    arrest_warrants: [{ charge: string }]
    weight: number
    height: number
    sex_id: string
    place_of_birth: string
    name: string
    distinguishing_marks: string
}

interface IResponsePersons {
    total: number
    _embedded: {
        notices: IDataPerson[]
    }
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://ws-public.interpol.int/notices/',
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    return result
}

export const api = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth as unknown as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryMeta
    >,
    endpoints: (builder) => ({
        getPersons: builder.query<IResponsePersons, IGetPerson>({
            query: ({ page, resultPerPage, searchValue }) => ({
                url: 'v1/red/',
                params: {
                    page: page ?? '1',
                    resultPerPage: resultPerPage ?? '12',
                    forename: searchValue,
                },
            }),
        }),
        getPersonById: builder.query<DataDetail, string>({
            query: (id) => ({
                url: `v1/red/${id}`,
            }),
        }),
    }),
})

export const { useGetPersonsQuery, useGetPersonByIdQuery } = api
