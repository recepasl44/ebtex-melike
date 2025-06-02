import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateAssignmentStudent } from '../../../slices/assignmentStudents/update/thunk';
import { AssignmentStudentsUpdatePayload } from '../../../types/assignmentStudents/update';

export function useAssignmentStudentUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.assignmentStudentsUpdate);

    const updateExistingAssignmentStudent = useCallback(
        async (payload: AssignmentStudentsUpdatePayload) => {
            const resultAction = await dispatch(updateAssignmentStudent(payload));
            if (updateAssignmentStudent.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedAssigmentStudent: data, status, error, updateExistingAssignmentStudent };
}
