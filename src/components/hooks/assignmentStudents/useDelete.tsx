import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteAssignmentStudent } from '../../../slices/assignmentStudents/delete/thunk';

export function useAssignmentStudentDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.assignmentStudentsDelete);

    const deleteExistingAssignmentStudent = useCallback(
        async (id: number) => {
            const resultAction = await dispatch(deleteAssignmentStudent(id));
            if (deleteAssignmentStudent.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedAssignmentStudent: data, status, error, deleteExistingAssignmentStudent };
}
