import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { jsonApi } from '../services/jsonApi'
import userReducer from '../features/user/userSlice'
export const store = configureStore({

  reducer: {
    usr:userReducer,
    [jsonApi.reducerPath]:jsonApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(jsonApi.middleware),
  })
setupListeners(store.dispatch)