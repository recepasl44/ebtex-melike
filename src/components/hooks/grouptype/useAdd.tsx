import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { addGroupType } from '../../../slices/grouptype/add/thunk'
import { GroupTypesAddPayload } from '../../../types/grouptype/add'

export function useGroupTypeAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.groupTypeAdd)

    const addNewGroupType = useCallback(
        async (payload: GroupTypesAddPayload) => {
            const resultAction = await dispatch(addGroupType(payload))
            if (addGroupType.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { addedGroupType: data, status, error, addNewGroupType }
}
