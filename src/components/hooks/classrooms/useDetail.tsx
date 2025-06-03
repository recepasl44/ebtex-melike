
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchClassroom } from '../../../slices/classrooms/detail/thunk';

export function useClassroomDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.classroomDetail
    );

    const getClassroom = useCallback(async (classroomId: number) => {
        const resultAction = await dispatch(fetchClassroom(classroomId));
        if (fetchClassroom.fulfilled.match(resultAction)) {
            return resultAction.payload;
        }
        return null;
    }, [dispatch]);

    return { classroom: data, status, error, getClassroom };
}

export default useClassroomDetail;
