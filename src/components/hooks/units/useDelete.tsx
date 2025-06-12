import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteUnit } from '../../../slices/units/delete/thunk';

export function useUnitDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.unitsDelete);

    const deleteExistingUnit = useCallback(
        async (unitId: number) => {
            const resultAction = await dispatch(deleteUnit(unitId));
            if (deleteUnit.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedUnit: data, status, error, deleteExistingUnit };
}
