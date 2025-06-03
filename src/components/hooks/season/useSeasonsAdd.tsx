import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addSeason } from '../../../slices/seasons/add/thunk';
import { SeasonsAddPayload } from '../../../types/seasons/add';

export function useSeasonAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.seasonsAddSlice);

    const addNewSeason = useCallback(
        async (payload: SeasonsAddPayload) => {
            const resultAction = await dispatch(addSeason(payload));
            if (addSeason.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedSeason: data, status, error, addNewSeason };
};
