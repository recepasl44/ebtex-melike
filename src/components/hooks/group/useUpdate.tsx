import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateGroup } from '../../../slices/group/update/thunk'
import { GroupsUpdatePayload } from '../../../types/group/update'

export function useGroupUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.groupUpdate)

    const updateExistingGroup = useCallback(
        async (payload: GroupsUpdatePayload) => {
            const resultAction = await dispatch(updateGroup(payload))
            if (updateGroup.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedGroup: data, status, error, updateExistingGroup }
}
