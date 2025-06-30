import { data } from './list'
import ContractEmployeesListStatus from '../../enums/contractEmployees/list'

export interface ContractEmployeesDeletePayload {
  id?: number
}

export interface ContractEmployeesDeleteState {
  data: data | null
  status: ContractEmployeesListStatus
  error: string | null
}
