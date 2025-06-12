import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteBranch } from '../../../slices/branch/delete/thunk';

export function useBranchDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.branchDelete);

  const removeBranch = useCallback(
    async (branchId: number) => {
      const resultAction = await dispatch(deleteBranch(branchId));
      if (deleteBranch.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedBranchId: data, status, error, removeBranch };
}
