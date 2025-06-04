import { SchoolCategoryData } from "./list";
import SchoolCategoriesListStatus from "../../enums/schoolcategories/list";

export interface SchoolCategoriesAddPayload {
  id?: number;
  name: string;
}

export interface SchoolCategoriesAddState {
  data: SchoolCategoryData | null;
  status: SchoolCategoriesListStatus;
  error: string | null;
}
