import ListInstallmentStatus from '../../enums/Installment/list';


export interface IInstallment {
  id: number;
  enrollment_id: number;
  amount: string;            // API "103000.00" gibi string olabilir
  order_no: number;          // API "order_no"
  due_date: string;          // "YYYY-MM-DD HH:mm:ss"
  is_paid: number | null;   // API null veya 0/1 gelebilir
  payment_date: string;      // "0000-00-00 00:00:00" vb.
}


export interface IPaginationMeta {
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
  per_page: number;
}

export interface ListInstallmentsArgs {
  enabled?: boolean;
  [key: string]: any;
}


export interface ListInstallmentsParams {
  paginate?: number;
  orderBy?: string;     // "ASC" | "DESC"
  sortBy?: string;      // "created_at" vs.
  enrollment_id?: number;
  is_paid?: number;
  // ... 
}

export interface ListInstallmentsResponse {
  data: IInstallment[];
  meta?: IPaginationMeta;
}


export interface ListInstallmentsState {
  data: IInstallment[];            // asıl taksit listesi
  meta: IPaginationMeta | null;    // sayfalama bilgisi
  status: ListInstallmentStatus;
  error: string | null;
}
