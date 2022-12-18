import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import facturiReducer from '../features/facturi/facturiSlice'
import clientReducer from '../features/client/clientSlice'
import sortareReducer from '../features/sortare/sortareSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    facturi: facturiReducer,
    client: clientReducer,
    sortare: sortareReducer,
  },
})
