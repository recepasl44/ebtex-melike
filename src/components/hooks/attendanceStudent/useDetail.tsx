import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchAttendanceStudent } from '../../../slices/attendanceStudent/detail/thunk'

export function useAttendanceStudentDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceStudentDetail)

    const getAttendanceStudent = useCallback(async (attendanceStudentId: number) => {
        const resultAction = await dispatch(fetchAttendanceStudent(attendanceStudentId))
        if (fetchAttendanceStudent.fulfilled.match(resultAction)) {
            return resultAction.payload
        }
        return null
    }, [dispatch])

    return { attendanceStudent: data, status, error, getAttendanceStudent }
}
