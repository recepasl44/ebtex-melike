export interface PaymentRecord {
  id: number;
  date: string;
  amount_paid: number;
  payer: string;
  receipt_no: string;
  user: string;
  description: string;
}

export interface CheckRecord {
  id: number;
  check_type: string;
  owner: string;
  company: string;
  debtor: string;
  creditor: string;
  creditor_phone: string;
  kind: string;
  date: string;
  recipient_bank: string;
  document_no: string;
  payable_amount: number;
  paid_amount: number;
  remaining_amount: number;
  status: string;
  description: string;
  image?: string | null;
  payments: PaymentRecord[];
}
