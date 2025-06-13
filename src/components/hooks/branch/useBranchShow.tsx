import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchBranch } from "../../../slices/branch/show/thunk";

export function useBranchShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.branchShow
  );

  const getBranch = useCallback(
    async (branchId: number) => {
      const resultAction = await dispatch(fetchBranch(branchId));
      if (fetchBranch.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { branch: data, status, error, getBranch };
}
