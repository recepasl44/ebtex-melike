import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteSource } from '../../../slices/sources/delete/thunk';

export function useSourceDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.sourcesDelete);

    const deleteExistingSource = useCallback(
        async (id: number) => {
            const resultAction = await dispatch(deleteSource(id));
            if (deleteSource.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedSource: data, status, error, deleteExistingSource };
}
