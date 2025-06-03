import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { fetchSchoolType } from "../../../slices/schoolTypes/show/thunk";

export function useSchoolTypeShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.schoolTypeShow
    );

    const getSchoolType = useCallback(
        async (schoolTypeId: number) => {
            const resultAction = await dispatch(fetchSchoolType(schoolTypeId));
            console.log("Fetching school type with ID:", resultAction);
            if (fetchSchoolType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );
    return { schoolType: data, status, error, getSchoolType };
}
