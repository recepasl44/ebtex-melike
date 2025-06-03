import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateAgreement } from '../../../slices/agreements/update/thunk';
import { AgreementsUpdatePayload } from '../../../types/agreements/update';

export function useAgreementUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.agreementsUpdate);

  const updateExistingAgreement = useCallback(
    async (payload: AgreementsUpdatePayload) => {
      const resultAction = await dispatch(updateAgreement(payload));
      if (updateAgreement.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedAgreement: data, status, error, updateExistingAgreement };
}
