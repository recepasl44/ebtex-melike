import { UserData } from "./list";
import UserListStatus from "../../enums/user/list";

export interface UserUpdatePayload {
  userId: number;
  payload: {
    first_name?: string;
    last_name?: string;
    email?: string;
    status?: number;
    [key: string]: any;
  };
}

export interface UserUpdateState {
  data: UserData | null;
  status: UserListStatus;
  error: string | null;
}
