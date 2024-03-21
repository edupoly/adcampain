// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const jsonApi = createApi({
  reducerPath: 'jsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4600/' }),
  endpoints: (builder) => ({
    checkUser: builder.query({
      query: (values) => `users/?username=${values.username}&password=${values.password}`,
    }),
    getAllCampaings:builder.query({
      query:()=>`campaigns`
    }),
    addCampaign:builder.mutation({
      query:(newCampaign)=>{
        return {
          method:"POST",
          url:`/campaigns`,
          body:newCampaign
        }
      }
    }),
    adRegistration:builder.mutation({
      query:(newregistration)=>{
        return {
          method:"POST",
          url:`/registrations`,
          body:newregistration
        }
      }
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAdRegistrationMutation,useLazyCheckUserQuery,useAddCampaignMutation,useGetAllCampaingsQuery } = jsonApi