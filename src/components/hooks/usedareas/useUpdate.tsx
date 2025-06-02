import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateUsedArea } from '../../../slices/usedareas/update/thunk'
import { UsedAreasUpdatePayload } from '../../../types/usedareas/update'

export function useUsedAreaUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.usedAreasUpdate)

    const updateExistingUsedArea = useCallback(
        async (payload: UsedAreasUpdatePayload) => {
            const resultAction = await dispatch(updateUsedArea(payload))
            if (updateUsedArea.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedUsedArea: data, status, error, updateExistingUsedArea }
}
