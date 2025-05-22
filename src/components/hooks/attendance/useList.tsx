/* src/components/hooks/attendance/useList.tsx
   ---------------------------------------------------------------
   Yoklama (attendance) listesi için tip-güvenli React hook’u
   – AttendanceData, Meta ve enum’lar ile tam uyumlu
   – Sayfa / sayfaBoyutu / filtre yönetimi
   – Redux slice’ından hata, yüklenme, meta verileri alır
   --------------------------------------------------------------- */

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { AppDispatch } from "../../../store";
import { fetchAttendances } from "../../../slices/attendance/list/thunk";
import {
    AttendancesListArg,
    AttendanceData,
    Meta as AttendanceMeta,
} from "../../../types/attendance/list";
import { AttendanceListStatus } from "../../../enums/attendance/list";

export function useAttendancesTable(params: AttendancesListArg = {}) {
    const dispatch = useDispatch<AppDispatch>();

    /* ----- lokal pagination state --------------------------------------- */
    const [page, setPage] = useState<number>(params.page ?? 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize ?? 25);

    /* ----- opsiyonel filtre payload ------------------------------------- */
    const [filter, setFilter] = useState<Record<string, unknown> | null>(null);

    /* ----- redux slice state -------------------------------------------- */
    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.attendanceList
    ) as {
        data: AttendanceData[] | null;
        meta: AttendanceMeta | null;
        status: AttendanceListStatus;
        error: string | null;
    };

    /* ----- params stabilizasyonu ---------------------------------------- */
    const { enabled = true, ...otherParams } = params;

    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchAttendances({
                ...otherParams,
                filter,
                page,
                pageSize,
                per_page: pageSize,
            })
        );
    }, [
        enabled,
        filter,
        page,
        pageSize,
        dispatch,
        // diğer parametrelerdeki değişiklikleri takip et
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(otherParams),
    ]);

    /* ----- derived helpers ---------------------------------------------- */
    const loading = status === AttendanceListStatus.LOADING;

    const attendancesData: AttendanceData[] = useMemo(
        () => data ?? [],
        [data]
    );

    const totalPages = meta?.last_page ?? 1;
    const totalItems = meta?.total ?? 0;

    /* ----- public API ---------------------------------------------------- */
    return {
        attendancesData,
        loading,
        error,

        page,
        pageSize,
        totalPages,
        totalItems,

        setPage,
        setPageSize,
        setFilter,
    };
}
