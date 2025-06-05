import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";

import { fetchQuizSessions } from "../../../slices/quizSessions/list/thunk";
import {
    IQuizSession,
    QuizSessionListMeta,
} from "../../../types/quizSessions/list";
import { QuizSessionListStatus } from "../../../enums/quizSessions/list";

export function useQuizSessionsList(params: any) {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.quizSessionList
    );

    const { enabled, ...otherParams } = params;
    useEffect(() => {
        if (!enabled) return;
        dispatch(
            fetchQuizSessions({
                ...otherParams,
                filter,
                enabled: false,
            })
        );
    }, [enabled, filter, dispatch]);

    const loading = status === QuizSessionListStatus.LOADING;
    const quizSessionsData: IQuizSession[] = data || [];
    const paginationMeta: QuizSessionListMeta | null = meta;

    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        quizSessionsData,
        loading,
        error,

        page,
        pageSize,
        totalPages,
        totalItems,

        setPage,
        setPageSize,
        setFilter,
        searchTerm,
        setSearchTerm,
    };
}
