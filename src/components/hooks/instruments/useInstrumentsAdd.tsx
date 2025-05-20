import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addInstrument } from '../../../slices/instruments/add/thunk';
import { InstrumentAddPayload } from '../../../types/instruments/add';

export function useInstrumentsAdd() {
    const dispatch = useDispatch<AppDispatch>();


    const instrumentAddState = useSelector((state: RootState) => state.instrumentsAdd) || {};
    const { data, status, error } = instrumentAddState;

    const addNewInstrument = useCallback(
        async (payload: InstrumentAddPayload) => {
            const resultAction = await dispatch(addInstrument(payload));
            if (addInstrument.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return {
        addedInstrument: data,
        status,
        error,
        addNewInstrument,
    };
}
