import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addTopic } from '../../../slices/topics/add/thunk';
import { TopicsAddPayload } from '../../../types/topics/add';

export function useTopicAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.topicsAdd);

    const addNewTopic = useCallback(
        async (payload: TopicsAddPayload) => {
            const resultAction = await dispatch(addTopic(payload));
            if (addTopic.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedTopic: data, status, error, addNewTopic };
}
