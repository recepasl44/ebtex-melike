import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchExamRelevances } from "../../../slices/examrelevances/list/thunk";
import { data, meta, ExamRelevanceListArg } from "../../../types/examrelevances/list";
import { ExamRelevanceListStatus } from "../../../enums/examrelevances/list";

export function useExamRelevancesTable(params: ExamRelevanceListArg) {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.examRelevancesList
    );

    useEffect(() => {
        if (params?.enabled === false) return;

        const query: ExamRelevanceListArg = {
            enabled: true,
            ...params,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        };

        dispatch(fetchExamRelevances(query));
    }, [dispatch, filter, page, pageSize]);

    const loading = status === ExamRelevanceListStatus.LOADING;
    const examRelevancesData: data[] = data || [];
    const paginationMeta: meta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        examRelevancesData,
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
