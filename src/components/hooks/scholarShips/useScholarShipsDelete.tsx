
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteScholarship } from "../../../slices/scholarShips/delete/thunk";

export function useScholarShipsDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.scholarshipDelete
    );

    const removeScholarship = useCallback(
        async (scholarshipId: number) => {
            const resultAction = await dispatch(deleteScholarship(scholarshipId));
            if (deleteScholarship.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedScholarshipId: data, status, error, removeScholarship };
}
