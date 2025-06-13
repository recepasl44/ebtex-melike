import { SchoolCategoryData } from "./list";
import SchoolCategoriesListStatus from "../../enums/schoolcategories/list";

export interface SchoolCategoriesDeletePayload {
  id?: number;
}

export interface SchoolCategoriesDeleteState {
  data: SchoolCategoryData | null;
  status: SchoolCategoriesListStatus;
  error: string | null;
}
