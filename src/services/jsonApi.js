// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const jsonApi = createApi({
  reducerPath: 'jsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    checkUser: builder.query({
      query: (values) => `users/?username=${values.username}&password=${values.password}`,
    }),
    checkExistingUser: builder.query({
      query: (values) => `users/?email=${values}`,
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
    addNewUser:builder.mutation({
      query:(newUser)=>{
        return {
          method:"POST",
          url:`/users`,
          body:newUser
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
    }),
    updateProfile:builder.mutation({
      query:(update)=>{
        return {
          method:"PUT",
          url:`/users/${update.id}`,
          body:update
        }
      }
    }),
    getRegisteredByCourseAndCampaigner:builder.query({
      query:(values)=>{
        console.log("values",values);
        return {
          url:`registrations/?campaigner=${values.username}&course=${values.course}`
        }
      }
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useAdRegistrationMutation,
                useAddNewUserMutation,
                useUpdateProfileMutation,
                useLazyCheckExistingUserQuery,
                useLazyGetRegisteredByCourseAndCampaignerQuery,
                useLazyCheckUserQuery,
                useAddCampaignMutation,
                useGetAllCampaingsQuery } = jsonApi