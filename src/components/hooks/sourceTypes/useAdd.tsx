import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addSourceType } from '../../../slices/sourceTypes/add/thunk';
import { SourceTypesAddPayload } from '../../../types/sourceTypes/add';

export function useSourceTypeAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.sourceTypesAdd);

    const addNewSourceType = useCallback(
        async (payload: SourceTypesAddPayload) => {
            const resultAction = await dispatch(addSourceType(payload));
            if (addSourceType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedSourceType: data, status, error, addNewSourceType };
}
