
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch} from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateInstallment } from '../../../slices/Installment/update/thunk';
import { UpdateInstallmentPayload } from '../../../types/Installment/update';

export function useUpdateInstallment() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(
    (state: RootState) => state.updateInstallment
  );

  const editInstallment = useCallback(async (payload: UpdateInstallmentPayload) => {
    const resultAction = await dispatch(updateInstallment(payload));
    if (updateInstallment.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      return null;
    }
  }, [dispatch]);

  return {
    updatedInstallment: data,
    status,
    error,
    editInstallment,
  };
}
