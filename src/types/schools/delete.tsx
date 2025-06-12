import SchoolDeleteStatus from "../../enums/schools/list";

export interface SchoolDeleteState {
  data: number | null;
  status: SchoolDeleteStatus;
  error: string | null;
}
