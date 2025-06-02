
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateProgram } from '../../../slices/programs/update/thunk';
import { ProgramUpdatePayload } from '../../../types/programs/update';  

export function useProgramUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.programUpdate);

  const updateProgramDetails = useCallback(
    async (payload: ProgramUpdatePayload) => {
      const resultAction = await dispatch(updateProgram(payload));
      if (updateProgram.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedProgram: data, status, error, updateProgramDetails };
}
