import { Program } from "./list";

export interface ProgramUpdatePayload {
  categoryId?: any;
  payload: {
    name: any;
  };
}

export interface ProgramUpdateState {
  data: Program | null;
  status: "IDLE" | "LOADING" | "SUCCEEDED" | "FAILED";
  error: string | null;
}
