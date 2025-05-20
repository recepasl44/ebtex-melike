/*  src/components/hooks/teachers/useList.tsx  */
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchTeachers } from "../../../slices/teachers/list/thunk";
import {
    TeacherData,
    TeacherMeta,
    TeacherListArg,
} from "../../../types/teachers/list";
import { TeachersListStatus } from "../../../enums/teachers/list";

export function useTeachersTable(rawParams: TeacherListArg) {
    const dispatch = useDispatch<AppDispatch>();

    /* ────────────────── parametreyi stabilleştir ──────────────────
       rawParams her render'da yeni obje olmasın diye useMemo ile
       referansını sabitliyoruz. */
    const params = useMemo(
        () => ({
            page: 1,
            pageSize: 10,
            enabled: true,
            ...rawParams,
        }),
        [rawParams.enabled, rawParams.page, rawParams.pageSize] // gerekli alt-parametreler
    );

    /* ───────────── local pagination state (isteğe bağlı) ───────────── */
    const [page, setPage] = useState<number>(params.page);
    const [pageSize, setPageSize] = useState<number>(params.pageSize);
    const [filter, setFilter] = useState<any>(null);

    /* ─────────────────── redux state selector ─────────────────── */
    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.teacherList
    );

    /* ───────────────────── data fetch effect ───────────────────── */
    useEffect(() => {
        if (params.enabled === false) return;

        const query: TeacherListArg = {
            ...params,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        };

        dispatch(fetchTeachers(query));
    }, [dispatch, params, filter, page, pageSize]);

    /* ────────────────────── derived values ─────────────────────── */
    const loading = status === TeachersListStatus.LOADING;
    const teachersData: TeacherData[] = data || [];
    const paginationMeta: TeacherMeta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    /* ───────────────────────── api ─────────────────────────────── */
    return {
        teachersData,
        loading,
        error,

        /* pagination helpers */
        page,
        setPage,
        pageSize,
        setPageSize,

        /* filter helpers */
        filter,
        setFilter,

        totalPages,
        totalItems,
    };
}
