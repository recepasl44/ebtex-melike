import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchChapter } from '../../../slices/chapters/detail/thunk';

export function useChapterShow() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.chaptersShow
    );

    const getChapter = useCallback(async (chapterId: number) => {
        const resultAction = await dispatch(fetchChapter(chapterId));
        if (fetchChapter.fulfilled.match(resultAction)) {
            return resultAction.payload;
        }
        return null;
    }, [dispatch]);

    return { chapter: data, status, error, getChapter };
}
export default useChapterShow;
