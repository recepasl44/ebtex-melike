
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch} from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { createInstallment } from '../../../slices/Installment/add/thunk';
import { CreateInstallmentPayload } from '../../../types/Installment/add';

export function useAddInstallment() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.addInstallment
  );

  const addInstallment = useCallback(
    async (payload: CreateInstallmentPayload) => {
      const resultAction = await dispatch(createInstallment(payload));
      if (createInstallment.fulfilled.match(resultAction)) {
        return resultAction.payload; // success 
      } else {
        return null; // or throw an error
      }
    },
    [dispatch]
  );

  return {
    installment: data,
    status,
    error,
    addInstallment,
  };
}
