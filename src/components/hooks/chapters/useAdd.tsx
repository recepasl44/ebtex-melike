import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addChapter } from '../../../slices/chapters/add/thunk';
import { ChaptersAddPayload } from '../../../types/chapters/add';

export function useChapterAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.chaptersAdd);

    const addNewChapter = useCallback(
        async (payload: ChaptersAddPayload) => {
            const resultAction = await dispatch(addChapter(payload));
            if (addChapter.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedChapter: data, status, error, addNewChapter };
}
