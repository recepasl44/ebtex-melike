import { Program } from "./list";
export interface ProgramAddPayload {
  name: string;
  category_id?: number;
}

export interface ProgramAddState {
  data: Program | null;
  status: "IDLE" | "LOADING" | "SUCCEEDED" | "FAILED";
  error: string | null;
}
