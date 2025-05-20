import { ISchool } from "./list";
import SchoolListStatus from "../../enums/schools/list";

export interface ISchoolAddPayload {
  name: string;
  country_id?: number;
  city_id?: number;
  county_id?: number;
  code?: string;
  website?: string;
  address?: string;
  phone?: string;
  email?: string;
  fax?: string;
  additional_information?: string;
  type_id?: number;
}

export interface SchoolAddState {
  data: ISchool | null;
  status: SchoolListStatus;
  error: string | null;
}
