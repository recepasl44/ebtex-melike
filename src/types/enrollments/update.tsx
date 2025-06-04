import { Enrollment } from './list'
import { EnrollmentsListStatus } from '../../enums/enrollments/list'

export interface EnrollmentUpdatePayload {
  enrollmentId: number
  payload: {
    student_id?: number
    service_id?: number
    [key: string]: any
  }
}

export interface EnrollmentUpdateState {
  data: Enrollment | null
  status: EnrollmentsListStatus
  error: string | null
}
