import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { getNextSerial } from '../../../slices/supplierInvoices/nextSerial/thunk'
import { InvoiceNextSerialState } from '../../../types/supplierInvoices/nextSerial'

export function useNextSerial() {
  const dispatch = useDispatch<AppDispatch>()
  const { serialNo, status, error } = useSelector(
    (state: RootState) => state.invoiceNextSerial
  ) as InvoiceNextSerialState

  const fetchNextSerial = useCallback(async () => {
    const resultAction = await dispatch(getNextSerial({}))
    if (getNextSerial.fulfilled.match(resultAction)) {
      return resultAction.payload.serial_no
    }
    return null
  }, [dispatch])

  return { serialNo, status, error, fetchNextSerial }
}
