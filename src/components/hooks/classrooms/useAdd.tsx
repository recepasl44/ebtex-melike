
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addClassroom } from "../../../slices/classrooms/add/thunk";
import { ClassroomAddPayload } from "../../../types/classrooms/add";

export function useClassroomAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.classroomAdd
    );

    const addNewClassroom = useCallback(
        async (payload: ClassroomAddPayload) => {
            const action = await dispatch(addClassroom(payload));
            return addClassroom.fulfilled.match(action) ? action.payload : null;
        },
        [dispatch]
    );

    return { addedClassroom: data, status, error, addNewClassroom };
}
