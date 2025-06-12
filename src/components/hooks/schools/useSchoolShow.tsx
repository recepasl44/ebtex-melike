import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchSchool } from "../../../slices/schools/show/thunk";

export function useSchoolShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.schoolShow
    );

    const getSchool = useCallback(
        async (schoolId: number) => {
            const resultAction = await dispatch(fetchSchool(schoolId));
            console.log("Fetching school with ID:", resultAction);
            if (fetchSchool.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );
    return { school: data, status, error, getSchool };
}
