import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addTeacher } from '../../../slices/teachers/add/thunk';
import { TeachersAddPayload } from '../../../types/teachers/add';

export function useTeacherAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.teacherAdd);

    const addNewTeacher = useCallback(
        async (payload: TeachersAddPayload) => {
            const resultAction = await dispatch(addTeacher(payload));
            if (addTeacher.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedTeacher: data, status, error, addNewTeacher };
}
