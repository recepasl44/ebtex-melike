import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteSeason } from '../../../slices/seasons/delete/thunk';

export function useSeasonDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.seasonsDeleteSlice);

    const deleteExistingSeason = useCallback(
        async (seasonId: number) => {
            const resultAction = await dispatch(deleteSeason(seasonId));
            if (deleteSeason.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedSeason: data, status, error, deleteExistingSeason };
}