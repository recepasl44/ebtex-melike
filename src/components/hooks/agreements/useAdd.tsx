import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addAgreement } from '../../../slices/agreements/add/thunk';
import { AgreementsAddPayload } from '../../../types/agreements/add';

export function useAgreementAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.agreementsAdd);

  const addNewAgreement = useCallback(
    async (payload: AgreementsAddPayload) => {
      const resultAction = await dispatch(addAgreement(payload));
      if (addAgreement.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedAgreement: data, status, error, addNewAgreement };
}
