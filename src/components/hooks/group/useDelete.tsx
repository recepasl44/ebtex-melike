import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { deleteGroup } from '../../../slices/group/delete/thunk'

export function useGroupDelete() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.groupDelete)

    const deleteExistingGroup = useCallback(
        async (groupId: number) => {
            const resultAction = await dispatch(deleteGroup(groupId))
            if (deleteGroup.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { deletedGroup: data, status, error, deleteExistingGroup }
}
