import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchSupplierPayments } from '../../../slices/supplierPayments/list/thunk'
import { SupplierPaymentsListArg, SupplierPaymentData } from '../../../types/supplierPayments/list'
import SupplierPaymentsListStatus from '../../../enums/supplierPayments/list'

export function useSupplierPaymentsList(params: SupplierPaymentsListArg) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierPaymentsList)

 const [filter] = useState<any>(null);

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchSupplierPayments({
        ...otherParams,
        filter,
        enabled,
      })
    );
  }, [enabled, filter, dispatch,otherParams.search]);

  const loading = status === SupplierPaymentsListStatus.LOADING
  const supplierPaymentsData: SupplierPaymentData[] = data || []

  return {
    supplierPaymentsData,
    loading,
    error,
  }
}
