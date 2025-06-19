import { PaymentMethod } from './list'
import { PaymentMethodsListStatus } from '../../enums/paymentMethods/list'

export interface PaymentMethodAddPayload {
  id: number
  name: string
  type?: number | null
}

export interface PaymentMethodAddState {
  data: PaymentMethod | null
  status: PaymentMethodsListStatus
  error: string | null
}
