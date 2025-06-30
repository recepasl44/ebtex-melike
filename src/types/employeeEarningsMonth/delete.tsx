import { EmployeeMonth } from './list';
import EmployeeEarningsMonthListStatus from '../../enums/employeeEarningsMonth/list';

export interface EmployeeEarningsMonthDeletePayload {
  id?: number;
}

export interface EmployeeEarningsMonthDeleteState {
  data: EmployeeMonth | null;
  status: EmployeeEarningsMonthListStatus;
  error: string | null;
}
