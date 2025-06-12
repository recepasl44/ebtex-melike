// F:\xintra_react_ts\src\components\hooks\Installment\useDelete.tsx
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch} from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteInstallment } from '../../../slices/Installment/delete/thunk';
import { DeleteInstallmentPayload } from '../../../types/Installment/delete';

export function useDeleteInstallment() {
  const dispatch = useDispatch<AppDispatch>();
  const { deletedId, status, error } = useSelector(
    (state: RootState) => state.deleteInstallment
  );

  const removeInstallment = useCallback(
    async (payload: DeleteInstallmentPayload) => {
      const resultAction = await dispatch(deleteInstallment(payload));
      if (deleteInstallment.fulfilled.match(resultAction)) {
        return resultAction.payload; // { deletedId: number }
      } else {
        return null;
      }
    },
    [dispatch]
  );

  return {
    deletedId,
    status,
    error,
    removeInstallment,
  };
}
