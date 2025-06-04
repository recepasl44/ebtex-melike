import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteChapter } from '../../../slices/chapters/delete/thunk';

export function useChapterDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.chaptersDelete);

    const deleteExistingChapter = useCallback(
        async (chapterId: number) => {
            const resultAction = await dispatch(deleteChapter(chapterId));
            if (deleteChapter.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedChapter: data, status, error, deleteExistingChapter };
}
