import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { deleteCountry } from "../../../slices/countries/delete/thunk";

export function useCountriesDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.countriesDelete
    );

    const removeCountry = useCallback(
        async (countryId: number) => {
            const resultAction = await dispatch(deleteCountry(countryId));
            if (deleteCountry.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedCountryId: data, status, error, removeCountry };
}
