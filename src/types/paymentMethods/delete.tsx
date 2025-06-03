import { PaymentMethod } from './list'
import { PaymentMethodsListStatus } from '../../enums/paymentMethods/list'

export interface PaymentMethodDeleteState {
  data: PaymentMethod | null
  status: PaymentMethodsListStatus
  error: string | null
}
