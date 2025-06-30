import { EmployeeMonth } from './list';
import EmployeeEarningsMonthListStatus from '../../enums/employeeEarningsMonth/list';

export interface EmployeeEarningsMonthAddPayload extends EmployeeMonth {}

export interface EmployeeEarningsMonthAddState {
  data: EmployeeMonth | null;
  status: EmployeeEarningsMonthListStatus;
  error: string | null;
}
