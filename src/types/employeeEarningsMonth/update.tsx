import { EmployeeMonth } from './list';
import EmployeeEarningsMonthListStatus from '../../enums/employeeEarningsMonth/list';

export interface EmployeeEarningsMonthUpdatePayload {
  id: number;
  payload: Partial<EmployeeMonth>;
}

export interface EmployeeEarningsMonthUpdateState {
  data: EmployeeMonth | null;
  status: EmployeeEarningsMonthListStatus;
  error: string | null;
}
