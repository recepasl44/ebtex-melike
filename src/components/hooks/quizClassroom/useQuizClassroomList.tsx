
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { fetchQuizClassrooms } from "../../../slices/quizClassroom/list/thunk";
import {
    QuizClassroom,
    QuizClassroomListMeta,

} from "../../../types/quizClassroom/list";

export interface QuizClassroomListArg {
    enabled?: boolean;
    quiz_id?: number;
    quiz_level_id?: number;
    classroom_id?: number;
    level_id?: number;
    paginate?: number;
    page?: number;
    pageSize?: number;
    filter?: any;
}

export function useQuizClassroomList(params: QuizClassroomListArg) {
    const dispatch = useDispatch<AppDispatch>();
    const { data, meta,  error } = useSelector(
        (state: RootState) => state.quizClassroomList
    );

    const [page, setPage] = useState(params.page || 1);
    const [pageSize, setPageSize] = useState(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(params.filter ?? null);

    const {
        enabled = false,
        quiz_id,
        quiz_level_id,
        classroom_id,
        level_id,
        paginate = 10,
    } = params;

    useEffect(() => {
        if (!enabled) return;
        dispatch(
            fetchQuizClassrooms({
                quiz_id,
                quiz_level_id,
                classroom_id,
                level_id,
                paginate,
                page,
                pageSize,
                filter,
                enabled: false,
            })
        );
    }, [
        enabled,
        quiz_id,
        quiz_level_id,
        classroom_id,
        level_id,
        paginate,
        page,
        pageSize,
        filter,
        dispatch,
    ]);

    return {
        quizClassroomsData: (data ?? []) as QuizClassroom[],
        error,

        page,
        pageSize,
        totalPages: (meta as QuizClassroomListMeta)?.last_page ?? 1,
        totalItems: (meta as QuizClassroomListMeta)?.total ?? 0,

        setPage,
        setPageSize,
        setFilter,
    };
}
