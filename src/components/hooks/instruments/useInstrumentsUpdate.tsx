import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateInstrument } from '../../../slices/instruments/update/thunk';
import { InstrumentUpdatePayload } from '../../../types/instruments/update';

export function useInstrumentsUpdate() {
    const dispatch = useDispatch<AppDispatch>();

    const instrumentUpdateState = useSelector(
        (state: RootState) => state.instrumentsUpdate
    ) || {};
    const { data, status, error } = instrumentUpdateState;

    const updateExistingInstrument = useCallback(
        async (payload: InstrumentUpdatePayload) => {
            const resultAction = await dispatch(updateInstrument(payload));
            if (updateInstrument.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return {
        updatedInstrument: data,
        status,
        error,
        updateExistingInstrument,
    };
}
