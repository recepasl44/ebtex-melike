import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addContractEmployee } from './thunk'
import { ContractEmployeesAddState } from '../../../types/contractEmployees/add'
import { ContractEmployeesListStatus } from '../../../enums/contractEmployees/list'

const initialState: ContractEmployeesAddState = {
  data: null,
  status: ContractEmployeesListStatus.IDLE,
  error: null
}

const contractEmployeeAddSlice = createSlice({
  name: 'contractEmployeeAdd',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addContractEmployee.pending, state => {
        state.status = ContractEmployeesListStatus.LOADING
        state.error = null
      })
      .addCase(addContractEmployee.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = ContractEmployeesListStatus.SUCCEEDED
        state.data = action.payload
      })
      .addCase(addContractEmployee.rejected, (state, action: PayloadAction<any>) => {
        state.status = ContractEmployeesListStatus.FAILED
        state.error = action.payload
      })
  }
})

export default contractEmployeeAddSlice.reducer
