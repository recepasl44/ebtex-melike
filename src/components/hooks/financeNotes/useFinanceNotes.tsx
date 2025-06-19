import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFinanceNotes } from '../../../slices/financeNotes/list/thunk';
import { RootState, AppDispatch } from '../../../store';

export function useFinanceNotes(initialPage: number = 1, initialPaginate: number = 25) {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(initialPage);
    const [paginate, setPaginate] = useState<number>(initialPaginate);
    const [query, setQuery] = useState<Record<string, any>>({});

    const financeNotesState = useSelector((state: RootState) => state.financeNotes);


    const queryKey = useMemo(() => JSON.stringify(query), [query]);

    useEffect(() => {
        const parsedQuery = JSON.parse(queryKey);
        dispatch(fetchFinanceNotes({ ...parsedQuery, page, paginate }));
    }, [dispatch, queryKey, page, paginate]);

    return {
        ...financeNotesState,
        page,
        paginate,
        setPage,
        setPaginate,
        query,
        setQuery,
    };
}

export default useFinanceNotes;
