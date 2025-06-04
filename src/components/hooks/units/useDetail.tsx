import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchUnit } from '../../../slices/units/detail/thunk';

export function useUnitShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.unitsShow
    );

    const getUnit = useCallback(async (unitId: number) => {
        const resultAction = await dispatch(fetchUnit(unitId));
        if (fetchUnit.fulfilled.match(resultAction)) {
            return resultAction.payload;
        }
        return null;
    }, [dispatch]);

    return { unit: data, status, error, getUnit };
}
export default useUnitShow;
