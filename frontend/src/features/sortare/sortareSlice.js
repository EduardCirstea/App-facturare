import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  an: '',
  luna: '',
  minLuna: '',
  maxLuna: '',
}

export const sortareSlice = createSlice({
  name: 'sortare',
  initialState,
  reducers: {
    newSort(state, action) {
      state.an = action.payload.an
      state.luna = action.payload.luna
      state.minLuna = action.payload.minLuna
      state.maxLuna = action.payload.maxLuna
    },
    reset: (state) => initialState,
  },
})

export const { newSort, reset } = sortareSlice.actions
export default sortareSlice.reducer
