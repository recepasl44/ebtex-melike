import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchBulletin } from '../../../slices/bulletins/detail/thunk';

export function useBulletinShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.bulletinShow);

  const getBulletin = useCallback(
    async (bulletinId: number) => {
      const resultAction = await dispatch(fetchBulletin(bulletinId));
      if (fetchBulletin.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { bulletin: data, status, error, getBulletin };
}
export default useBulletinShow;
