import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchSupplierNote } from '../../../slices/supplierNotes/detail/thunk'

export function useSupplierNotesDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierNotesDetail)

  const getSupplierNote = useCallback(
    async (payload: { supplierId: number; supplierNoteId: number }) => {
      const resultAction = await dispatch(fetchSupplierNote(payload))
      if (fetchSupplierNote.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { supplierNote: data, status, error, getSupplierNote }
}
