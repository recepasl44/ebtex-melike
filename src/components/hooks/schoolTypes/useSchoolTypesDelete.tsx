import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteSchoolType } from "../../../slices/schoolTypes/delete/thunk";


export function useSchoolTypeDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.schoolTypesDelete
    );

    const removeSchoolType = useCallback(
        async (schoolTypeId: number) => {
            const resultAction = await dispatch(deleteSchoolType(schoolTypeId));
            if (deleteSchoolType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deleteSchoolTypeId: data, status, error, removeSchoolType };
}