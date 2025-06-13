import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addAssignmentStudent } from '../../../slices/assignmentStudents/add/thunk';
import { AssignmentStudentsAddPayload } from '../../../types/assignmentStudents/add';

export function useAssignmentStudentAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.assignmentStudentsAdd);

    const addNewAssignmentStudent = useCallback(
        async (payload: AssignmentStudentsAddPayload) => {
            const resultAction = await dispatch(addAssignmentStudent(payload));
            if (addAssignmentStudent.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedAssignmentStudent: data, status, error, addNewAssignmentStudent };
}
