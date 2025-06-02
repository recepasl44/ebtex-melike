import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchTeacher } from '../../../slices/teachers/detail/thunk';

export function useTeacherShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.teacherShow);

    const getTeacher = useCallback(
        async (teacherId: number) => {
            const resultAction = await dispatch(fetchTeacher(teacherId));
            if (fetchTeacher.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { teacher: data, status, error, getTeacher };
}

export default useTeacherShow;
