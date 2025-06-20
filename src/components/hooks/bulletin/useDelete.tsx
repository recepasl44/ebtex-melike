import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteBulletin } from '../../../slices/bulletins/delete/thunk';

export function useBulletinDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.bulletinDelete);

  const deleteExistingBulletin = useCallback(
    async (bulletinId: number) => {
      const resultAction = await dispatch(deleteBulletin(bulletinId));
      if (deleteBulletin.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedBulletin: data, status, error, deleteExistingBulletin };
}
