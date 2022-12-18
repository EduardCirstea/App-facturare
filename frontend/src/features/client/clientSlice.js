import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import clientService from './clientService'

const initialState = {
  clients: [],
  client: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const createClient = createAsyncThunk(
  'client/create',
  async (clientData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await clientService.createClient(clientData, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getClients = createAsyncThunk(
  'client/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await clientService.getClients(token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getClient = createAsyncThunk(
  'client/getClient',
  async (numeFirma, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await clientService.getClient(numeFirma, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateClient = createAsyncThunk(
  'client/updateClient',
  async (updatedClient, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await clientService.updateClient(updatedClient, token)
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// export const deleteClient = createAsyncThunk(
//   'client/updateClient',
//   async (updatedClient, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await clientService.updateClient(updatedClient, token)
//     } catch (err) {
//       const message =
//         (err.response && err.response.data && err.response.data.message) ||
//         err.message ||
//         err.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClient.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createClient.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getClients.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false
        state.clients = action.payload
        state.isSuccess = true
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getClient.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.client = action.payload
      })
      .addCase(getClient.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateClient.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.client = action.payload
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
    // .addCase(deleteClient.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.message = action.payload
    //   state.isSuccess = true
    // })
    //   .addCase(closeTicket.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.tickets.map((ticket) =>
    //       ticket._id === action.payload._id
    //         ? (ticket.status = 'closed')
    //         : ticket
    //     )
    //     state.isSuccess = true
    //   })
  },
})

export const { reset } = clientSlice.actions
export default clientSlice.reducer
