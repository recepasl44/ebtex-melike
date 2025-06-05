import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchTopics } from "../../../slices/topics/list/thunk";
import { data, meta, TopicListArg } from "../../../types/topics/list";
import { TopicsListStatus } from "../../../enums/topics/list";

export function useTopicsTable(params: TopicListArg) {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.topicsList
    );

    useEffect(() => {
        if (params?.enabled === false) return;

        const query: TopicListArg = {
            enabled: true,
            ...params,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        };

        dispatch(fetchTopics(query));
    }, [dispatch, filter, page, pageSize, params]);

    const loading = status === TopicsListStatus.LOADING;
    const topicsData: data[] = data || [];
    const paginationMeta: meta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        topicsData,
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
