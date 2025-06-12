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

/**
 * Attendance yoklama listesi için hook
 */
export function useAttendancesTable(params: AttendancesListArg = {}) {
    const dispatch = useDispatch<AppDispatch>();

    // page ve pageSize parametrelerinin doğru tipte olduğundan emin ol
    const initialPage = typeof params.page === "number" && !isNaN(params.page) ? params.page : 1;
    const initialPageSize = typeof params.pageSize === "number" && !isNaN(params.pageSize) ? params.pageSize : 25;

    const [page, setPage] = useState<number>(initialPage);
    const [pageSize, setPageSize] = useState<number>(initialPageSize);

    const [filter, setFilter] = useState<Record<string, unknown> | null>(null);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.attendanceList
    ) as {
        data: AttendanceData[] | null;
        meta: AttendanceMeta | null;
        status: AttendanceListStatus;
        error: string | null;
    };

    const { enabled = true, ...otherParams } = params;

    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchAttendances({
                ...otherParams,
                filter,
                page,
                pageSize,
                per_page: pageSize, // API hem pageSize hem per_page kabul ediyorsa
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        enabled,
        filter,
        page,
        pageSize,
        dispatch,
        JSON.stringify(otherParams),
    ]);

    const loading = status === AttendanceListStatus.LOADING;
    const attendancesData: AttendanceData[] = useMemo(() => data ?? [], [data]);
    const totalPages = meta?.last_page ?? 1;
    const totalItems = meta?.total ?? 0;

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
