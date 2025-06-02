import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addSupplierNote } from '../../../slices/supplierNotes/add/thunk'
import { SupplierNotesAddPayload } from '../../../types/supplierNotes/add'

export function useSupplierNotesAdd() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, status, error } = useSelector((state: RootState) => state.supplierNotesAdd)

  const addNewSupplierNote = useCallback(
    async (payload: SupplierNotesAddPayload) => {
      const resultAction = await dispatch(addSupplierNote(payload))
      if (addSupplierNote.fulfilled.match(resultAction)) {
        return resultAction.payload
      }
      return null
    },
    [dispatch]
  )

  return { addedSupplierNote: data, status, error, addNewSupplierNote }
}
