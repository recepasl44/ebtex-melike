import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchContractEmployee } from './thunk'
import { ContractEmployeeShowState } from '../../../types/contractEmployees/detail'
import { ContractEmployeesListStatus } from '../../../enums/contractEmployees/list'

const initialState: ContractEmployeeShowState = {
  data: null,
  status: ContractEmployeesListStatus.IDLE,
  error: null
}

const contractEmployeeShowSlice = createSlice({
  name: 'contractEmployeeShow',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchContractEmployee.pending, state => {
      state.status = ContractEmployeesListStatus.LOADING
      state.error = null
    })
    builder.addCase(fetchContractEmployee.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = ContractEmployeesListStatus.SUCCEEDED
      state.data = action.payload
    })
    builder.addCase(fetchContractEmployee.rejected, (state, action: PayloadAction<any>) => {
      state.status = ContractEmployeesListStatus.FAILED
      state.error = action.payload
    })
  }
})

export default contractEmployeeShowSlice.reducer
