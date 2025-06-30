import { EmployeeMonth } from './list';
import EmployeeEarningsMonthListStatus from '../../enums/employeeEarningsMonth/list';

export interface EmployeeEarningsMonthDetailState {
  data: EmployeeMonth | null;
  status: EmployeeEarningsMonthListStatus;
  error: string | null;
}
