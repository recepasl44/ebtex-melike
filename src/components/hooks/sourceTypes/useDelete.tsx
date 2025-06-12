import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteSourceType } from '../../../slices/sourceTypes/delete/thunk';

export function useSourceTypeDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.sourceTypesDelete);

    const deleteExistingSourceType = useCallback(
        async (id: number) => {
            const resultAction = await dispatch(deleteSourceType(id));
            if (deleteSourceType.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedSourceType: data, status, error, deleteExistingSourceType };
}
