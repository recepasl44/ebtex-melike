import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { updateUser } from '../../../slices/user/update/thunk'
import { UserUpdatePayload } from '../../../types/user/update'

export function useUserUpdate() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.userUpdate)

    const updateExistingUser = useCallback(
        async (payload: UserUpdatePayload) => {
            const resultAction = await dispatch(updateUser(payload))
            if (updateUser.fulfilled.match(resultAction)) {
                return resultAction.payload
            }
            return null
        },
        [dispatch]
    )

    return { updatedUser: data, status, error, updateExistingUser }
}
