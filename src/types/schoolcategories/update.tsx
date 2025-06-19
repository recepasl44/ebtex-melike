import { SchoolCategoryData } from "./list";
import SchoolCategoriesListStatus from "../../enums/schoolcategories/list";

export interface SchoolCategoriesUpdatePayload {
  categoryId: number;
  payload: {
    name: string;
  };
}

export interface SchoolCategoriesUpdateState {
  data: SchoolCategoryData | null;
  status: SchoolCategoriesListStatus;
  error: string | null;
}
