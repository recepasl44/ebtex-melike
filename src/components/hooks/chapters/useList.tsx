import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchChapters } from "../../../slices/chapters/list/thunk";
import { data, meta, ChapterListArg } from "../../../types/chapters/list";
import { ChaptersListStatus } from "../../../enums/chapters/list";

export function useChaptersTable(params: ChapterListArg) {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.chaptersList
    );

    useEffect(() => {
        if (params?.enabled === false) return;

        const query: ChapterListArg = {
            enabled: true,
            ...params,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        };

        dispatch(fetchChapters(query));
    }, [dispatch, filter, page, pageSize]);

    const loading = status === ChaptersListStatus.LOADING;
    const chaptersData: data[] = data || [];
    const paginationMeta: meta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        chaptersData,
        loading,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        filter,
        setFilter,
        totalPages,
        totalItems,
    };
}
