import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateSeason } from '../../../slices/seasons/update/thunk';
import { SeasonsUpdatePayload } from '../../../types/seasons/update';

export function useSeasonUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.seasonsUpdateSlice);

    const updateExistingSeason = useCallback(
        async (payload: SeasonsUpdatePayload) => {
            const resultAction = await dispatch(updateSeason(payload));
            if (updateSeason.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );
    return { updatedSeason: data, status, error, updateExistingSeason };
}