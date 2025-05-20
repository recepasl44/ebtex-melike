import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteGroupType } from '../../../slices/grouptype/delete/thunk'

export function useGroupTypeDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.groupTypeDelete)

    const deleteExistingGroupType = useCallback(
        async (groupTypeId: number) => {
            const resultAction = await dispatch(deleteGroupType(groupTypeId))
            if (deleteGroupType.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedGroupType: data, status, error, deleteExistingGroupType }
}
