
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addProgram } from '../../../slices/programs/add/thunk';
import { ProgramAddPayload } from '../../../types/programs/add';  

export function useProgramAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.programAdd);

  const addNewProgram = useCallback(
    async (payload: ProgramAddPayload) => {
   

      const resultAction = await dispatch(addProgram(payload));
      if (addProgram.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedProgram: data, status, error, addNewProgram };
}
