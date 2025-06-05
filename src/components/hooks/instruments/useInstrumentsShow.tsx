import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchInstrument } from '../../../slices/instruments/show/thunk';

export function useInstrumentsShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.instrumentShow
    );

    const getInstrument = useCallback(async (instrumentId: number) => {
        const resultAction = await dispatch(fetchInstrument(instrumentId));
        if (fetchInstrument.fulfilled.match(resultAction)) {
            return resultAction.payload;
        }
        return null;
    }, [dispatch]);

    return { instrument: data, status, error, getInstrument };
}