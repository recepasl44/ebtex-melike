import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateBranch } from '../../../slices/branch/update/thunk';
import { BranchUpdatePayload } from '../../../types/branch/update';

export function useBranchUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.branchUpdate);

  const updateExistingBranch = useCallback(
    async (payload: BranchUpdatePayload) => {
      const resultAction = await dispatch(updateBranch(payload));
      if (updateBranch.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedBranch: data, status, error, updateExistingBranch };
}
