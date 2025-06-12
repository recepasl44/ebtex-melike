import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteTopic } from '../../../slices/topics/delete/thunk';

export function useTopicDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.topicsDelete);

    const deleteExistingTopic = useCallback(
        async (topicId: number) => {
            const resultAction = await dispatch(deleteTopic(topicId));
            if (deleteTopic.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedTopic: data, status, error, deleteExistingTopic };
}
