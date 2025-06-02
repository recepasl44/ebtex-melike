import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteClassroom } from "../../../slices/classrooms/delete/thunk";

export function useClassroomDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.classroomDelete
    );

    const deleteExistingClassroom = useCallback(
        async (classroomId: number) => {
            const resultAction = await dispatch(deleteClassroom(classroomId));
            if (deleteClassroom.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedClassroom: data, status, error, deleteExistingClassroom };
}
