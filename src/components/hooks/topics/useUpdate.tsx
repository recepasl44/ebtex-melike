import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateTopic } from '../../../slices/topics/update/thunk';
import { TopicsUpdatePayload } from '../../../types/topics/update';

export function useTopicUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.topicsUpdate);

    const updateExistingTopic = useCallback(
        async (payload: TopicsUpdatePayload) => {
            const resultAction = await dispatch(updateTopic(payload));
            if (updateTopic.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedTopic: data, status, error, updateExistingTopic };
}
