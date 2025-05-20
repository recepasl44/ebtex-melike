import PersonelDeleteStatus from "../../../enums/employee/personel/list";

export interface PersonelDeleteState {
  data: number | null;
  status: PersonelDeleteStatus;
  error: string | null;
}
