import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteProgram } from "../../../slices/programs/delete/thunk";

export function useProgramDelete(_id?: number) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.programDelete);
  const deleteExistingProgram = useCallback(async (programId: number) => {
    const resultAction = await dispatch(deleteProgram(programId));
    if (deleteProgram.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);
  return { deletedProgram: data, status, error, deleteExistingProgram };
}
