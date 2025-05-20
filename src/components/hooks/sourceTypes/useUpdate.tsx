import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateSourceType } from '../../../slices/sourceTypes/update/thunk';
import { SourceTypesUpdatePayload } from '../../../types/sourceTypes/update';

export function useSourceTypeUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.sourceTypesUpdate);

    const updateExistingSourceType = useCallback(
        async (payload: SourceTypesUpdatePayload) => {
            const resultAction = await dispatch(updateSourceType(payload));
            if (updateSourceType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedSourceType: data, status, error, updateExistingSourceType };
}
