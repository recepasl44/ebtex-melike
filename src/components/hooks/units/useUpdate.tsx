import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateUnit } from '../../../slices/units/update/thunk';
import { UnitsUpdatePayload } from '../../../types/units/update';

export function useUnitUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.unitsUpdate);

    const updateExistingUnit = useCallback(
        async (payload: UnitsUpdatePayload) => {
            const resultAction = await dispatch(updateUnit(payload));
            if (updateUnit.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedUnit: data, status, error, updateExistingUnit };
}
