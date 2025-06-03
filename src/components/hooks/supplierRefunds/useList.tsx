import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchSupplierRefunds } from '../../../slices/supplierRefunds/list/thunk'
import { SupplierRefundData, SupplierRefundsListArg } from '../../../types/supplierRefunds/list'
import SupplierRefundsListStatus from '../../../enums/supplierRefunds/list'

export function useSupplierRefundsList(params: SupplierRefundsListArg) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierRefundsList)
  const [filter] = useState<any>(null);

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchSupplierRefunds({
        ...otherParams,
        filter,
        enabled,
      })
    );
  }, [enabled, filter, dispatch,otherParams.search]);

  const loading = status === SupplierRefundsListStatus.LOADING
  const supplierRefundsData: SupplierRefundData[] = data || []

  return {
    supplierRefundsData,
    loading,
    error,
  }
}
