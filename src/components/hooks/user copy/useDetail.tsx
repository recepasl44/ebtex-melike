import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store'
import { RootState } from '../../../store/rootReducer'
import { fetchUser } from '../../../slices/user/detail/thunk'

export function useUserDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { data, status, error } = useSelector((state: RootState) => state.userDetail)

    const getUser = useCallback(async (userId: number) => {
        const resultAction = await dispatch(fetchUser(userId))
        if (fetchUser.fulfilled.match(resultAction)) {
            return resultAction.payload
        }
        return null
    }, [dispatch])

    return { user: data, status, error, getUser }
}
