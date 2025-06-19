import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchAttendanceTeacher } from '../../../slices/attendanceTeacher/detail/thunk'

export function useAttendanceTeacherDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.attendanceTeacherDetail)

    const getAttendanceTeacher = useCallback(async (attendanceTeacherId: number) => {
        const resultAction = await dispatch(fetchAttendanceTeacher(attendanceTeacherId))
        if (fetchAttendanceTeacher.fulfilled.match(resultAction)) {
            return resultAction.payload
        }
        return null
    }, [dispatch])

    return { attendanceTeacher: data, status, error, getAttendanceTeacher }
}
