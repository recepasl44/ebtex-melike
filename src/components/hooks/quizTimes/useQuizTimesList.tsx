import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";

import { fetchQuizTimes } from "../../../slices/quizTimes/list/thunk";
import {
    IQuizTime,
    QuizTimeListArg,
    QuizTimeListMeta,
} from "../../../types/quizTimes/list";
import { QuizTimeListStatus } from "../../../enums/quizTimes/list";

export function useQuizTimesList(params: QuizTimeListArg) {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.quizTimeList
    );

    const { enabled, ...otherParams } = params;
    useEffect(() => {
        if (!enabled) return;
        dispatch(
            fetchQuizTimes({
                ...otherParams,
                filter,
                enabled: false,
            })
        );
    }, [enabled, filter, dispatch]);

    const loading = status === QuizTimeListStatus.LOADING;
    const quizTimesData: IQuizTime[] = data || [];
    const paginationMeta: QuizTimeListMeta | null = meta;

    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        quizTimesData,
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
