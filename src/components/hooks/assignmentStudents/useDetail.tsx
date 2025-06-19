import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchAssignmentStudent } from '../../../slices/assignmentStudents/detail/thunk';

export function useAssignmentStudentDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.assignmentStudentsDetail);

    const getAssignmentStudent = useCallback(
        async (id: number) => {
            const resultAction = await dispatch(fetchAssignmentStudent(id));
            if (fetchAssignmentStudent.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { assignmentStudent: data, status, error, getAssignmentStudent };
}
