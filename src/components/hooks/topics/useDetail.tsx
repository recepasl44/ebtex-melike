import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchTopic } from '../../../slices/topics/detail/thunk';

export function useTopicShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.topicsShow
    );

    const getTopic = useCallback(async (topicId: number) => {
        const resultAction = await dispatch(fetchTopic(topicId));
        if (fetchTopic.fulfilled.match(resultAction)) {
            return resultAction.payload;
        }
        return null;
    }, [dispatch]);

    return { topic: data, status, error, getTopic };
}
export default useTopicShow;
