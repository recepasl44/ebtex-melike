import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateLesson } from '../../../slices/lessons/update/thunk';
import { LessonUpdatePayload } from '../../../types/lessons/update';

export function useLessonUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.lessonUpdate);

    const updateExistingLesson = useCallback(
        async (payload: LessonUpdatePayload) => {
            const resultAction = await dispatch(updateLesson(payload));
            if (updateLesson.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedLesson: data, status, error, updateExistingLesson };
}
