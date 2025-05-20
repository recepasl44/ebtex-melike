import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootReducer'
import { AppDispatch } from '../../../store'
import { fetchSupplierNotes } from '../../../slices/supplierNotes/list/thunk'
import { SupplierNotesListArg, SupplierNoteData } from '../../../types/supplierNotes/list'
import SupplierNotesListStatus from '../../../enums/supplierNotes/list'

export function useSupplierNotesList(params: SupplierNotesListArg) {
  const dispatch = useDispatch<AppDispatch>()
  const {
    data,
    current_page,
    last_page,
    total,
    status,
    error,
  } = useSelector((state: RootState) => state.supplierNotesList)

 const [filter] = useState<any>(null);

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;
    dispatch(
      fetchSupplierNotes({
        ...otherParams,
        filter,
        enabled,
      })
    );
  }, [enabled, filter, dispatch,otherParams.search]);

  const loading = status === SupplierNotesListStatus.LOADING
  const supplierNotesData: SupplierNoteData[] = data || []
  const totalPages = last_page || 1
  const totalItems = total || 0

  return {
    supplierNotesData,
    loading,
    error,
    current_page,
    totalPages,
    totalItems,
  }
}
