
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { updateClassroom } from "../../../slices/classrooms/update/thunk";
import { ClassroomUpdatePayload } from "../../../types/classrooms/update";

export function useClassroomUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.classroomUpdate
    );

    const updateExistingClassroom = useCallback(
        async (payload: ClassroomUpdatePayload) => {
            const action = await dispatch(updateClassroom(payload));
            return updateClassroom.fulfilled.match(action) ? action.payload : null;
        },
        [dispatch]
    );

    return { updatedClassroom: data, status, error, updateExistingClassroom };
}
