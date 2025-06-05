import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchLesson } from '../../../slices/lessons/detail/thunk';

export function useLessonDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.lessonShow);

    const getLessonDetail = useCallback(
        async (lessonId: number) => {
            const resultAction = await dispatch(fetchLesson(lessonId));
            if (fetchLesson.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { lessonDetail: data, status, error, getLessonDetail };
}
