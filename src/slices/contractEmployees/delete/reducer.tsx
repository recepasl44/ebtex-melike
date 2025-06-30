import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteContractEmployee } from './thunk'
import { ContractEmployeesDeleteState } from '../../../types/contractEmployees/delete'
import { ContractEmployeesListStatus } from '../../../enums/contractEmployees/list'

const initialState: ContractEmployeesDeleteState = {
  data: null,
  status: ContractEmployeesListStatus.IDLE,
  error: null
}

const contractEmployeesDeleteSlice = createSlice({
  name: 'contractEmployeesDelete',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteContractEmployee.pending, state => {
        state.status = ContractEmployeesListStatus.LOADING
        state.error = null
      })
      .addCase(deleteContractEmployee.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ContractEmployeesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(deleteContractEmployee.rejected, (state, action: PayloadAction<any>) => {
        state.status = ContractEmployeesListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default contractEmployeesDeleteSlice.reducer
