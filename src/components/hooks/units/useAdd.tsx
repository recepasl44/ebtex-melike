import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addUnit } from '../../../slices/units/add/thunk';
import { UnitsAddPayload } from '../../../types/units/add';

export function useUnitAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.unitsAdd);

    const addNewUnit = useCallback(
        async (payload: UnitsAddPayload) => {
            const resultAction = await dispatch(addUnit(payload));
            if (addUnit.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedUnit: data, status, error, addNewUnit };
}
