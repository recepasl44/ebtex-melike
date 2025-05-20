import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchUsedArea } from '../../../slices/usedareas/detail/thunk'

export function useUsedAreaDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.usedAreasDetail)

    const getUsedArea = useCallback(
        async (usedAreaId: number) => {
            const resultAction = await dispatch(fetchUsedArea(usedAreaId))
            if (fetchUsedArea.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { usedArea: data, status, error, getUsedArea }
}
