
export interface PaymentMethod {
  id: number
  name: string
  type: number | null
}

export interface PaymentMethodsListResponse {
  data: PaymentMethod[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

export interface PaymentMethodsListArg {
  enabled?: boolean
  [key: string]: any
}
