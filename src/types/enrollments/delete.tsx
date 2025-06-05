import { Enrollment } from './list'
import { EnrollmentsListStatus } from '../../enums/enrollments/list'

export interface EnrollmentDeleteState {
  data: Enrollment | null
  status: EnrollmentsListStatus
  error: string | null
}
