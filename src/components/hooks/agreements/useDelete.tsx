import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteAgreement } from '../../../slices/agreements/delete/thunk';

export function useAgreementDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.agreementsDelete);

  const deleteExistingAgreement = useCallback(
    async (agreementId: number) => {
      const resultAction = await dispatch(deleteAgreement(agreementId));
      if (deleteAgreement.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedAgreement: data, status, error, deleteExistingAgreement };
}
