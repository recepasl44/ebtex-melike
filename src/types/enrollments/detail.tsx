import { Enrollment } from './list'
import { EnrollmentsListStatus } from '../../enums/enrollments/list'

export interface EnrollmentDetailState {
  data: Enrollment | null
  status: EnrollmentsListStatus
  error: string | null
}
