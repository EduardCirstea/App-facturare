import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import facturiService from './facturiService'

const initialState = {
  facturi: [],
  factura: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const getFacturi = createAsyncThunk(
  'facturi/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await facturiService.getFacturi(token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getFactura = createAsyncThunk(
  'facturi/getFactura',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await facturiService.getFactura(ticketId, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createFactura = createAsyncThunk(
  'facturi/create',
  async (facturaData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await facturiService.createFactura(facturaData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const updateFactura = createAsyncThunk(
  'facturi/update',
  async (facturaData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await facturiService.updateFactura(facturaData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const facturiSlice = createSlice({
  name: 'facturi',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFactura.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createFactura.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createFactura.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFacturi.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFacturi.fulfilled, (state, action) => {
        state.isLoading = false
        state.facturi = action.payload
        state.isSuccess = true
      })
      .addCase(getFacturi.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFactura.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFactura.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.factura = action.payload
      })
      .addCase(getFactura.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateFactura.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateFactura.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.factura = action.payload
      })
      .addCase(updateFactura.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

    // .addCase(closeTicket.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.tickets.map((ticket) =>
    //     ticket._id === action.payload._id
    //       ? (ticket.status = 'closed')
    //       : ticket
    //   )
    //   state.isSuccess = true
    // })
  },
})

export const { reset } = facturiSlice.actions
export default facturiSlice.reducer
