export interface TransferData {
  id: number;
  transaction_type: string;
  sender_branch_id: number;
  receiver_branch_id: number;
  branch_id: number;
  amount: string;
  bank_account: string;
  description: string;
  seassion_id: number;
  created_at: string;
  updated_at: string;
  platform_id: number;
}

export interface TransferMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}
export interface TransferListArg {
  enabled?: boolean;
  [key: string]: any;
}
export interface ListTransferResponse {
  data: TransferData[];
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  prev_page_url: string | null;
  meta: TransferMeta;
}
