import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteInstrument } from '../../../slices/instruments/delete/thunk';

export function useInstrumentsDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.instrumentsDelete);

    const removeInstrument = useCallback(
        async (instrumentId: number) => {
            const resultAction = await dispatch(deleteInstrument(instrumentId));
            if (deleteInstrument.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedInstrumentId: data, status, error, removeInstrument };
}