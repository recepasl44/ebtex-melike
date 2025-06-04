import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteUsedArea } from '../../../slices/usedareas/delete/thunk'

export function useUsedAreaDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.usedAreasDelete)

    const deleteExistingUsedArea = useCallback(
        async (usedAreaId: number) => {
            const resultAction = await dispatch(deleteUsedArea(usedAreaId))
            if (deleteUsedArea.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedUsedArea: data, status, error, deleteExistingUsedArea }
}
