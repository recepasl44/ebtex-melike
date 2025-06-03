import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteLesson } from '../../../slices/lessons/delete/thunk';

export function useLessonDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.lessonDelete);

    const deleteExistingLesson = useCallback(
        async (lessonId: number) => {
            const resultAction = await dispatch(deleteLesson(lessonId));
            if (deleteLesson.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedLesson: data, status, error, deleteExistingLesson };
}
