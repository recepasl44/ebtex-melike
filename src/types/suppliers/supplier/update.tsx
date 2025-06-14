import { Supplier } from './list'
import SuppliersUpdateStatus from '../../../enums/suppliers/update'

export interface SuppliersUpdatePayload {
  supplierId: number
  payload: {
    register_no: string
    name: string
    mail?: string
    phone?: string
    address?: string
    fax?: string
    iban?: string
    taxNumber?: string
    taxOffice?: string
    status?: number
  }
}

export interface SuppliersUpdateState {
  data: Supplier | null
  status: SuppliersUpdateStatus
  error: string | null
}
