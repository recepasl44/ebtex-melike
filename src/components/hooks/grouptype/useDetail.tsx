import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchGroupType } from '../../../slices/grouptype/detail/thunk'

export function useGroupTypeDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.groupTypeDetail)

    const getGroupType = useCallback(async (groupTypeId: number) => {
        const resultAction = await dispatch(fetchGroupType(groupTypeId))
        if (fetchGroupType.fulfilled.match(resultAction)) {
            return resultAction.payload
        }
        return null
    }, [dispatch])

    return { groupType: data, status, error, getGroupType }
}
