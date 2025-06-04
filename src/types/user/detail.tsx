import { UserData } from "./list";
import UserListStatus from "../../enums/user/list";

export interface UserDetailState {
  data: UserData | null;
  status: UserListStatus;
  error: string | null;
}
