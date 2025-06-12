import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchSource } from '../../../slices/sources/detail/thunk';

export function useSourceDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.sourcesDetail);

  const getSource = useCallback(async (sourceId: number) => {
    const resultAction = await dispatch(fetchSource(sourceId));
    if (fetchSource.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { source: data, status, error, getSource };
}
