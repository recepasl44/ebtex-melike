import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addAttendanceTeacher } from '../../../slices/attendanceTeacher/add/thunk'
import { AttendanceTeachersAddPayload } from '../../../types/attendanceTeacher/add'

export function useAttendanceTeacherAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceTeacherAdd)

    const addNewAttendanceTeacher = useCallback(
        async (payload: AttendanceTeachersAddPayload) => {
            const resultAction = await dispatch(addAttendanceTeacher(payload))
            if (addAttendanceTeacher.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedAttendanceTeacher: data, status, error, addNewAttendanceTeacher }
}
