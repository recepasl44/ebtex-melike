import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchProgramDetail } from "../../../slices/programs/detail/thunk";

export function useProgramDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.programDetail);
  const getProgramDetail = useCallback(async (programId: number) => {
    const resultAction = await dispatch(fetchProgramDetail(programId));
    if (fetchProgramDetail.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);
  return { programDetail: data, status, error, getProgramDetail };
}
