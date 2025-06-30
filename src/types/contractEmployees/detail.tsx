import { data } from './list'
import ContractEmployeesListStatus from '../../enums/contractEmployees/list'

export interface ContractEmployeeShowState {
  data: data | null
  status: ContractEmployeesListStatus
  error: string | null
}
