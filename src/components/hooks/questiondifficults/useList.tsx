import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchQuestionDifficults } from "../../../slices/questiondifficults/list/thunk";
import { data, meta, QuestionDifficultListArg } from "../../../types/questiondifficults/list";
import { QuestionDifficultListStatus } from "../../../enums/questiondifficults/list";

export function useQuestionDifficultsTable(params: QuestionDifficultListArg) {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.questionDifficultsList
    );

    useEffect(() => {
        if (params?.enabled === false) return;

        const query: QuestionDifficultListArg = {
            enabled: true,
            ...params,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        };

        dispatch(fetchQuestionDifficults(query));
    }, [dispatch, filter, page, pageSize]);

    const loading = status === QuestionDifficultListStatus.LOADING;
    const questionDifficultsData: data[] = data || [];
    const paginationMeta: meta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        questionDifficultsData,
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
