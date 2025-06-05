import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchAgreement } from '../../../slices/agreements/detail/thunk';

export function useAgreementDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.agreementsDetail);

  const getAgreement = useCallback(
    async (agreementId: number) => {
      const resultAction = await dispatch(fetchAgreement(agreementId));
      if (fetchAgreement.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { agreement: data, status, error, getAgreement };
}
