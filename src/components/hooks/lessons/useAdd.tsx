import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addLesson } from '../../../slices/lessons/add/thunk';
import { LessonAddPayload } from '../../../types/lessons/add';

export function useLessonAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.lessonAdd);

    const addNewLesson = useCallback(
        async (payload: LessonAddPayload) => {
            const resultAction = await dispatch(addLesson(payload));
            if (addLesson.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedLesson: data, status, error, addNewLesson };
}
