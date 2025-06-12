import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteTeacher } from '../../../slices/teachers/delete/thunk';

export function useTeacherDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.teacherDelete);

    const deleteExistingTeacher = useCallback(
        async (teacherId: number) => {
            const resultAction = await dispatch(deleteTeacher(teacherId));
            if (deleteTeacher.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedTeacher: data, status, error, deleteExistingTeacher };
}
