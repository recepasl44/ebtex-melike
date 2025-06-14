import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateTeacher } from '../../../slices/teachers/update/thunk';
import { TeachersUpdatePayload } from '../../../types/teachers/update';

export function useTeacherUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.teacherUpdate);

    const updateExistingTeacher = useCallback(
        async (payload: TeachersUpdatePayload) => {
            const resultAction = await dispatch(updateTeacher(payload));
            if (updateTeacher.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedTeacher: data, status, error, updateExistingTeacher };
}
