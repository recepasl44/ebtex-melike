import { PaymentMethod } from './list'
import { PaymentMethodsListStatus } from '../../enums/paymentMethods/list'

export interface PaymentMethodUpdatePayload {
  paymentMethodId: number
  payload: {
    name?: string
    type?: number | null
  }
}

export interface PaymentMethodUpdateState {
  data: PaymentMethod | null
  status: PaymentMethodsListStatus
  error: string | null
}
