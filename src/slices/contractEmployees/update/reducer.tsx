import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateContractEmployee } from './thunk'
import { ContractEmployeesUpdateState } from '../../../types/contractEmployees/update'
import { ContractEmployeesListStatus } from '../../../enums/contractEmployees/list'

const initialState: ContractEmployeesUpdateState = {
  data: null,
  status: ContractEmployeesListStatus.IDLE,
  error: null
}

const contractEmployeesUpdateSlice = createSlice({
  name: 'contractEmployeesUpdate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateContractEmployee.pending, state => {
        state.status = ContractEmployeesListStatus.LOADING
        state.error = null
      })
      .addCase(updateContractEmployee.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ContractEmployeesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(updateContractEmployee.rejected, (state, action: PayloadAction<any>) => {
        state.status = ContractEmployeesListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default contractEmployeesUpdateSlice.reducer
