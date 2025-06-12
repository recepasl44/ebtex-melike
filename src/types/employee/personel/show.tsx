import { Personel } from "./list";
import PersonelListStatus from "../../../enums/employee/personel/list";

export interface PersonelShowState {
  data: Personel | null;
  status: PersonelListStatus;
  error: string | null;
}
