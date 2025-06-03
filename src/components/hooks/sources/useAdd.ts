import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addSource } from '../../../slices/sources/add/thunk';
import { SourcesAddPayload } from '../../../types/sources/add';

export function useSourceAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.sourcesAdd);

  const addNewSource = useCallback(
    async (payload: SourcesAddPayload) => {
      const resultAction = await dispatch(addSource(payload));
      if (addSource.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedSource: data, status, error, addNewSource };
}
