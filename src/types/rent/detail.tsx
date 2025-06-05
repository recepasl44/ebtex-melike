export interface RentPayment {
  id?: number;
  payment_no: number;
  payment_date: string;
  amount: string;
}

export interface RentInstallment {
  id?: number;
  installment_no: number;
  due_date: string;
  amount: string;
  remaining_amount: string;
  payments: RentPayment[];
}

export interface IRent {
  id?: number;
  season_id: number;
  branch_id: number;
  rent_date: string;
  total_rent: string;
  created_at?: string;
  updated_at?: string;
  installments: RentInstallment[];
}

export interface RentShowState {
  data: IRent | null;
  status: RentStatus;
  error: string | null;
}

export enum RentStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}
