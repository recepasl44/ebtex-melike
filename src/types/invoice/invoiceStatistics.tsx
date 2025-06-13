export interface InvoiceStatisticsStudent {
  branch_name: string;
  tc_no: string;
  full_name: string;
  level_name: string;
  class_branch: string;
  parent_name: string;
  parent_relation: string;
  parent_phone: string;
  total_amount: number;
  invoices: {
    issue_date: string;
    service_name: string;
    amount: number;
  }[];
}
