import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchCountriesList } from "../../../slices/countries/list/thunk";


export function useCountriesShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.schoolShow
    );

    const getSchool = useCallback(
        async (countriesId: number) => {
            const resultAction = await dispatch(fetchCountriesList({ id: countriesId.toString() }));

            if (fetchCountriesList.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );
    return { school: data, status, error, getSchool };
}
