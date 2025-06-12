
export interface EnrollmentsListArg {
  enabled?: boolean
  [key: string]: any
}

export interface Branche {
  id: number
  name: string
  created_by: number
  type: number
}

export interface Program {
  id: number
  name: string
  category_id: number
  category: string
}

export interface Level {
  id: number
  program_id: number
  program: Program | null
  name: string
}

export interface Course {
  id: number
  level_id: number
  level: Level | null
  name: string
}

export interface Service {
  id: number
  branche_id: number
  branche: Branche | null
  level_id: number
  level: Level | null
  course_id: number
  course: Course | null
  program_id: number
  program: Program | null
  type_id: number | null
  type: any
  start_installment_date: string
  end_installment_date: string
  name: string
  price: string
  is_main: number
  max_installments: number
  max_discounts: number
  accept_discount: number
  vat_rate: string
}

export interface Installment {
  id: number
  enrollment_id: number
  amount: string
  order_no: number
  due_date: string
  is_paid: number | null
  payment_date: string
}

export interface Discount {
  id: number
  name: string
  is_seasonal: number
  type: number
  discount_type: number
  service_id: number
  amount: string
  created_at: string
  updated_at: string
  platform_id: number
}

export interface Enrollment {
  id: number
  student_id: number
  service_id: number
  service: Service | null
  installments: Installment[]
  total_fee: string | null
  discount_amount: string | null
  discounts: Discount[]
  final_fee: string | null
  advance_fee: string | null
  remaining_fee: string | null
  status: number | null
}

export interface EnrollmentsListResponse {
  data: Enrollment[]
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
