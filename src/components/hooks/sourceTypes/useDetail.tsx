import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchSourceType } from '../../../slices/sourceTypes/detail/thunk';

export function useSourceTypeDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.sourceTypesDetail);

    const getSourceType = useCallback(
        async (id: number) => {
            const resultAction = await dispatch(fetchSourceType(id));
            if (fetchSourceType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { sourceType: data, status, error, getSourceType };
}
