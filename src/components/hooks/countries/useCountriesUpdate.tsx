import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { updateCountry } from "../../../slices/countries/update/thunk";
import { CountryUpdatePayload } from "../../../types/countries/update";

export function useCountriesUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.countriesUpdate
    );

    const updateExistingCountry = useCallback(
        async (payload: CountryUpdatePayload) => {
            const resultAction = await dispatch(updateCountry(payload));
            if (updateCountry.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedCountry: data, status, error, updateExistingCountry };
}
