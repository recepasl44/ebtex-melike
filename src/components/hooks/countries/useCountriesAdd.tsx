import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { addCountry } from "../../../slices/countries/add/thunk";
import { CountryAddPayload } from "../../../types/countries/add";

export function useCountriesAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.countriesAdd
    );

    const addNewCountry = useCallback(
        async (payload: CountryAddPayload) => {
            const resultAction = await dispatch(addCountry(payload));
            if (addCountry.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedCountry: data, status, error, addNewCountry };
}
