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
    getAllCampainersFromUsers: builder.query({
      query: () => `users/?role=campaigner`,
    }),
    getAllCampaings:builder.query({
      query:()=>`campaigns`
    }),
    getAllRegistrations:builder.query({
      query:()=>`registrations`
    }),
    getAllRegistrationMembersByCam:builder.query({
      query:(rname)=>`registrations/?campaigner=${rname}`
    }),
    getRegisterByCourse:builder.query({
      query:(values)=>`registrations/?course=${values}`
    }),
    getGoogleUsers:builder.query({
      query:(values)=>`users/?email=${values}`
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
    }),
    adCampaignersThroughGlg:builder.mutation({
      query:(newregistration)=>{
        return {
          method:"POST",
          url:`/users`,
          body:newregistration
        }
      }
    }),
    updateUserDetails:builder.mutation({
      query:(newregistration)=>{
        return {
          method:"PUT",
          url:`/users/${newregistration.id}`,
          body:newregistration
        }
      }
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
   useAdRegistrationMutation,
   useLazyCheckUserQuery,
   useAddCampaignMutation,
   useGetAllCampaingsQuery,
   useGetAllRegistrationsQuery,
   useLazyGetRegisterByCourseQuery,
   useGetAllCampainersFromUsersQuery,
   useLazyGetAllRegistrationMembersByCamQuery,
   useLazyGetGoogleUsersQuery,
   useAdCampaignersThroughGlgMutation,
   useUpdateUserDetailsMutation,
   } = jsonApi