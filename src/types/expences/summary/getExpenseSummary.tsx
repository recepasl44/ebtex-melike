import GetExpenseSummary from "../../../enums/expense/summary/list";
import { FormikValues } from "formik";

export interface ExpenseSummary extends FormikValues {
  salary: {
    verecek?: string;
    odenen?: string;
    kalan?: string;
  };
  prim: {
    verecek?: string;
    odenen?: string;
    kalan?: string;
  };
  tazminat: {
    verecek?: string;
    odenen?: string;
    kalan?: string;
  };
}

export interface ExpenseSummaryResponse {
  data: ExpenseSummary;
}

export interface ExpenseSummaryState {
  data: ExpenseSummary | null;
  status: GetExpenseSummary;
  error: string | null;
}
