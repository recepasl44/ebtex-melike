import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchGroup } from '../../../slices/group/detail/thunk'

export function useGroupDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.groupDetail)

    const getGroup = useCallback(async (groupId: number) => {
        const resultAction = await dispatch(fetchGroup(groupId))
        if (fetchGroup.fulfilled.match(resultAction)) {
            return resultAction.payload
        }
        return null
    }, [dispatch])

    return { group: data, status, error, getGroup }
}
