import { Enrollment } from './list'
import { EnrollmentsListStatus } from '../../enums/enrollments/list'

export interface EnrollmentAddPayload {
  id: number
  student_id: number
  service_id?: number
  [key: string]: any
}

export interface EnrollmentAddState {
  data: Enrollment | null
  status: EnrollmentsListStatus
  error: string | null
}
