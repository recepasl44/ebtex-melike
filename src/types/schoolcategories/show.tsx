import { SchoolCategoryData } from "./list";
import SchoolCategoriesListStatus from "../../enums/schoolcategories/list";

export interface SchoolCategoryShowState {
  data: SchoolCategoryData | null;
  status: SchoolCategoriesListStatus;
  error: string | null;
}
