import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateSupplierNote } from '../../../slices/supplierNotes/update/thunk'
import { SupplierNotesUpdatePayload } from '../../../types/supplierNotes/update'

export function useSupplierNotesUpdate() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierNotesUpdate)

  const updateExistingSupplierNote = useCallback(
    async (payload: SupplierNotesUpdatePayload) => {
      const resultAction = await dispatch(updateSupplierNote(payload))
      if (updateSupplierNote.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { updatedSupplierNote: data, status, error, updateExistingSupplierNote }
}
