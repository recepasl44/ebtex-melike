import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addSchoolType } from "../../../slices/schoolTypes/add/thunk";
import { ISchoolTypeAddPayload } from "../../../types/schoolTypes/add";


export function useSchoolTypeAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.schoolTypesAdd
    );

    const addNewSchoolTypes = useCallback(
        async (payload: ISchoolTypeAddPayload) => {
            const resultAction = await dispatch(addSchoolType(payload));
            if (addSchoolType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );
    return { addedSchoolType: data, status, error, addNewSchoolTypes };
}