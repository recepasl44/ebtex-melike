import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateGroupType } from '../../../slices/grouptype/update/thunk'
import { GroupTypesUpdatePayload } from '../../../types/grouptype/update'

export function useGroupTypeUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.groupTypeUpdate)

    const updateExistingGroupType = useCallback(
        async (payload: GroupTypesUpdatePayload) => {
            const resultAction = await dispatch(updateGroupType(payload))
            if (updateGroupType.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedGroupType: data, status, error, updateExistingGroupType }
}
