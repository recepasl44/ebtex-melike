import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchQuestionTypes } from "../../../slices/questiontypes/list/thunk";
import { data, meta, QuestionTypeListArg } from "../../../types/questiontypes/list";
import { QuestionTypeListStatus } from "../../../enums/questiontypes/list";

export function useQuestionTypesTable(params: QuestionTypeListArg) {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.questionTypesList
    );

    useEffect(() => {
        if (params?.enabled === false) return;

        const query: QuestionTypeListArg = {
            enabled: true,
            ...params,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        };

        dispatch(fetchQuestionTypes(query));
    }, [dispatch, filter, page, pageSize]);

    const loading = status === QuestionTypeListStatus.LOADING;
    const questionTypesData: data[] = data || [];
    const paginationMeta: meta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        questionTypesData,
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
