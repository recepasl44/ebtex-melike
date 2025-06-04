import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchSupplierInvoices } from '../../../slices/supplierInvoices/list/thunk'
import { SupplierInvoicesListArg, SupplierInvoiceData } from '../../../types/supplierInvoices/list'
import SupplierInvoicesListStatus from '../../../enums/supplierInvoices/list'

export function useSupplierInvoicesList(params: SupplierInvoicesListArg) {
  const dispatch = useDispatch<AppDispatch>()
    const [filter] = useState<any>(null);
  
  const {
    data,
    current_page,
    last_page,
    total,
    status,
    error,
  } = useSelector((state: RootState) => state.supplierInvoicesList)

   const { enabled, ...otherParams } = params;
   useEffect(() => {
     if (!enabled) return;
     dispatch(
      fetchSupplierInvoices({
         ...otherParams,
         filter,
         enabled: false,
       })
     );
   }, [enabled, filter, dispatch]);

  const loading = status === SupplierInvoicesListStatus.LOADING
  const supplierInvoicesData: SupplierInvoiceData[] = data || []
  const totalPages = last_page || 1
  const totalItems = total || 0

  return {
    supplierInvoicesData,
    loading,
    error,
    current_page,
    totalPages,
    totalItems,
  }
}
