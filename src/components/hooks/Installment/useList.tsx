
import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { listInstallments } from '../../../slices/Installment/list/thunk';
import { ListInstallmentsArgs } from '../../../types/Installment/list';


export function useListInstallments(params :ListInstallmentsArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const [filter] = useState<any>(null);

  const { data, meta, status, error } = useSelector(
    (state: RootState) => state.listInstallments,
  );
 
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(listInstallments({ ...otherParams, filter }));
  }, [enabled, filter, dispatch]);
  

  return {
  
    data,
    installments: data,
    meta,
    status,
    error,
    listInstallments,
  };
}
