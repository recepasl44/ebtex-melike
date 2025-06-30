import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchContractEmployees } from './thunk'
import { ListContractEmployeesResponse } from '../../../types/contractEmployees/list'
import { ContractEmployeesListStatus } from '../../../enums/contractEmployees/list'

export interface ContractEmployeeListState {
  data: ListContractEmployeesResponse['data'] | null
  links: ListContractEmployeesResponse['links'] | null
  meta: ListContractEmployeesResponse['meta'] | null
  status: ContractEmployeesListStatus
  error: string | null
}

const initialState: ContractEmployeeListState = {
  data: null,
  links: null,
  meta: null,
  status: ContractEmployeesListStatus.IDLE,
  error: null
}

const contractEmployeeListSlice = createSlice({
  name: 'contractEmployees/list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchContractEmployees.pending, state => {
      state.status = ContractEmployeesListStatus.LOADING
      state.error = null
    })
    builder.addCase(fetchContractEmployees.fulfilled, (state, action: PayloadAction<ListContractEmployeesResponse>) => {
      state.status = ContractEmployeesListStatus.SUCCEEDED
      state.data = action.payload.data
      state.links = action.payload.links
      state.meta = action.payload.meta
    })
    builder.addCase(fetchContractEmployees.rejected, (state, action: PayloadAction<any>) => {
      state.status = ContractEmployeesListStatus.FAILED
      state.error = action.payload || 'Fetch contract employees failed'
    })
  }
})

export default contractEmployeeListSlice.reducer
