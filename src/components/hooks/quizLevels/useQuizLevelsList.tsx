// src/components/hooks/quizLevels/useQuizLevelsList.ts
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchQuizLevels } from "../../../slices/quizLevels/list/thunk";
import { QuizLevel, QuizLevelListArg, QuizLevelListMeta } from "../../../types/quizLevels/list";
import { QuizLevelListStatus } from "../../../enums/quizLevels/list";

export function useQuizLevelsList(args: QuizLevelListArg) {
    const dispatch = useDispatch<AppDispatch>();

    // pagination & filter
    const [page, setPage] = useState<number>(args.page || 1);
    const [pageSize, setPageSize] = useState<number>(args.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);

    // redux slice
    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.quizLevelsList
    );

    // destructure args
    const {
        enabled = false,
        quiz_id,
        branche_id,
        session_id,
        paginate = 10,
        ...rest
    } = args;

    useEffect(() => {
        if (!enabled) return;
        const query: QuizLevelListArg = {
            enabled: false,     // backend’e ikinci kez gönderme
            quiz_id,
            branche_id,
            session_id,
            paginate,
            page,
            pageSize,
            filter,
            ...rest,
        };
        dispatch(fetchQuizLevels(query));
    }, [dispatch, enabled, quiz_id, branche_id, session_id, paginate, page, pageSize, filter]);

    const loading = status === QuizLevelListStatus.LOADING;
    const quizLevelsData: QuizLevel[] = data || [];
    const paginationMeta: QuizLevelListMeta | null = meta;

    return {
        quizLevelsData,
        loading,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        filter,
        setFilter,
        totalPages: paginationMeta ? paginationMeta.last_page : 1,
        totalItems: paginationMeta ? paginationMeta.total : 0,
    };
}
