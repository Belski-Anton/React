import { DataDetail, IResponsePersons } from '.././src/interface/dataServer'
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
  page?: string
  resultPerPage?: string
  forename?: string
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
      query: ({ page = '1', resultPerPage = '12', forename = '' }) => ({
        url: 'v1/red/',
        params: {
          page,
          resultPerPage,
          forename,
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

export const { useGetPersonsQuery, useGetPersonByIdQuery, util: { getRunningQueriesThunk }, } = api