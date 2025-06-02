
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchScholarship } from "../../../slices/scholarShips/detail/thunk";

export function useScholarShipsDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.scholarshipDetail
    );

    const getScholarship = useCallback(
        async (scholarshipId: number) => {
            const resultAction = await dispatch(fetchScholarship(scholarshipId));
            console.log("Fetching scholarship with ID:", scholarshipId);
            if (fetchScholarship.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { scholarship: data, status, error, getScholarship };
}
