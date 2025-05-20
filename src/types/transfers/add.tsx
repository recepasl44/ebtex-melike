import { TransferData } from "./list";
import { TransferListStatus } from "../../enums/transfers/list";

export interface TransferAddPayload {
  transaction_type: string;
  sender_branch_id: number;
  receiver_branch_id: number;
  amount: number;
  bank_account: string;
  description: string;
  seassion_id: number;
}

export interface TransferAddState {
  data: TransferData | null;
  status: TransferListStatus;
  error: string | null;
}
export interface ITransferForm {
    transaction_type: string;
    sender_branch_id: number;
    receiver_branch_id: number;
    amount: number;
    bank_account: string;
    description: string;
    seassion_id: number;
    // Ekstra alanlar (örneğin çek/senet işlemleri için)
    sender_bank_account?: string;
    receiver_bank_account?: string;
    sender_instrument_id?: number;
    receiver_instrument_id?: number;
  }
