import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addSupplierDebt } from '../../../slices/supplierDebts/add/thunk'
import { SupplierDebtsAddPayload } from '../../../types/supplierDebts/add'

export function useSupplierDebtsAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierDebtsAdd)

  const addNewSupplierDebt = useCallback(
    async (payload: SupplierDebtsAddPayload) => {
      const resultAction = await dispatch(addSupplierDebt(payload))
      if (addSupplierDebt.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { addedSupplierDebt: data, status, error, addNewSupplierDebt }
}
