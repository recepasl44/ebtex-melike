import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateChapter } from '../../../slices/chapters/update/thunk';
import { ChaptersUpdatePayload } from '../../../types/chapters/update';

export function useChapterUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.chaptersUpdate);

    const updateExistingChapter = useCallback(
        async (payload: ChaptersUpdatePayload) => {
            const resultAction = await dispatch(updateChapter(payload));
            if (updateChapter.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedChapter: data, status, error, updateExistingChapter };
}
