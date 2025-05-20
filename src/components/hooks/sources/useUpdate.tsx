import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateSource } from '../../../slices/sources/update/thunk';
import { SourcesUpdatePayload } from '../../../types/sources/update';

export function useSourceUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.sourcesUpdate);

    const updateExistingSource = useCallback(
        async (payload: SourcesUpdatePayload) => {
            const resultAction = await dispatch(updateSource(payload));
            if (updateSource.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedSource: data, status, error, updateExistingSource };
}
