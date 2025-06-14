import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteSupplierNote } from '../../../slices/supplierNotes/delete/thunk'

export function useSupplierNotesDelete() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierNotesDelete)

  const deleteExistingSupplierNote = useCallback(
    async (payload: { supplierId: number; supplierNoteId: number }) => {
      const resultAction = await dispatch(deleteSupplierNote(payload))
      if (deleteSupplierNote.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { deletedSupplierNote: data, status, error, deleteExistingSupplierNote }
}
