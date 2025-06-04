import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addBranch } from '../../../slices/branch/add/thunk';
import { BranchAddPayload } from '../../../types/branch/add';

export function useBranchAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.branchAdd);

  const addNewBranch = useCallback(
    async (payload: BranchAddPayload) => {
      const resultAction = await dispatch(addBranch(payload));
      if (addBranch.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedBranch: data, status, error, addNewBranch };
}
