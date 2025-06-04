import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchSeason } from '../../../slices/seasons/detail/thunk';

export function useSeasonDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.seasonsShowSlice);

    const getSeason = useCallback(async (seasonId: number) => {
        const resultAction = await dispatch(fetchSeason(seasonId));
        if (fetchSeason.fulfilled.match(resultAction)) {
            return resultAction.payload;
        }
        return null;
    }, [dispatch]);

    return { season: data, status, error, getSeason };
}