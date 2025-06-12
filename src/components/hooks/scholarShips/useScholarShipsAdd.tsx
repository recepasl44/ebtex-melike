
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addScholarship } from "../../../slices/scholarShips/add/thunk";
import { IScholarShipAddPayload } from "../../../types/scholarShips/add";

export function useScholarShipsAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.scholarshipAdd
    );

    const addNewScholarship = useCallback(
        async (payload: IScholarShipAddPayload) => {
            const resultAction = await dispatch(addScholarship(payload));
            if (addScholarship.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );
    return { addedScholarship: data, status, error, addNewScholarship };
}
