import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addUsedArea } from '../../../slices/usedareas/add/thunk'
import { UsedAreasAddPayload } from '../../../types/usedareas/add'

export function useUsedAreaAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.usedAreasAdd)

    const addNewUsedArea = useCallback(
        async (payload: UsedAreasAddPayload) => {
            const resultAction = await dispatch(addUsedArea(payload))
            if (addUsedArea.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedUsedArea: data, status, error, addNewUsedArea }
}
