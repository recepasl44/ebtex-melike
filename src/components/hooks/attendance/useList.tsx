import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store';
import { fetchAttendances } from '../../../slices/attendance/list/thunk';
import {
    AttendancesListArg,
    data as AttendanceRow,
    meta as AttendanceMeta,
} from '../../../types/attendance/list';
import AttendanceListStatus from '../../../enums/attendance/list';

export function useAttendancesTable(params: AttendancesListArg) {
    const dispatch = useDispatch<AppDispatch>();

    /* ---- local pagination state ------------------------- */
    const [page, setPage] = useState<number>(params?.page || 1);
    const [pageSize, setPageSize] = useState<number>(params?.pageSize || 25);

    /* ---- redux slice state ------------------------------ */
    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.attendanceList,
    );

    /* ---- optional filter payload ------------------------ */
    const [filter, setFilter] = useState<any>(null);

    /* ---- split params to stabilise deps ----------------- */
    const { enabled = true, ...otherParams } = params;

    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchAttendances({
                enabled: true,
                ...otherParams,
                filter,
                page,
                pageSize,
                per_page: pageSize,
            }),
        );
    }, [enabled, filter, page, pageSize, dispatch, JSON.stringify(otherParams)]);

    /* ---- derived helpers -------------------------------- */
    const loading = status === AttendanceListStatus.LOADING;
    const attendancesData: AttendanceRow[] = data || [];
    const paginationMeta: AttendanceMeta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

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
