
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { updateScholarship } from "../../../slices/scholarShips/update/thunk";
import { IScholarShipUpdatePayload } from "../../../types/scholarShips/update";

export function useScholarShipsUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.scholarshipUpdate
    );

    const updateExistingScholarship = useCallback(
        async (payload: IScholarShipUpdatePayload) => {
            const resultAction = await dispatch(updateScholarship(payload));
            if (updateScholarship.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedScholarship: data, status, error, updateExistingScholarship };
}
