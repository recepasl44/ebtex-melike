import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addGroup } from '../../../slices/group/add/thunk'
import { GroupsAddPayload } from '../../../types/group/add'

export function useGroupAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.groupAdd)

    const addNewGroup = useCallback(
        async (payload: GroupsAddPayload) => {
            const resultAction = await dispatch(addGroup(payload))
            if (addGroup.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedGroup: data, status, error, addNewGroup }
}
