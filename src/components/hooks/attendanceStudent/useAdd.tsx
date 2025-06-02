import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addAttendanceStudent } from '../../../slices/attendanceStudent/add/thunk'
import { AttendanceStudentsAddPayload } from '../../../types/attendanceStudent/add'

export function useAttendanceStudentAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceStudentAdd)

    const addNewAttendanceStudent = useCallback(
        async (payload: AttendanceStudentsAddPayload) => {
            const resultAction = await dispatch(addAttendanceStudent(payload))
            if (addAttendanceStudent.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedAttendanceStudent: data, status, error, addNewAttendanceStudent }
}
