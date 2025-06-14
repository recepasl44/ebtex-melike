import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteSchool } from "../../../slices/schools/delete/thunk";

export function useSchoolDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.schoolDelete
    );

    const removeSchool = useCallback(
        async (schoolId: number) => {
            const resultAction = await dispatch(deleteSchool(schoolId));
            if (deleteSchool.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedSchoolId: data, status, error, removeSchool };
}
