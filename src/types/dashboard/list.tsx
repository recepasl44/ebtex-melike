import DashboardListStatus from '../../enums/dashboard/list';
import { DashboardResponseType } from '../../components/common/dashboard/type';

export interface DashboardListState {
  data: DashboardResponseType | null;
  status: DashboardListStatus;
  error: string | null;
}
