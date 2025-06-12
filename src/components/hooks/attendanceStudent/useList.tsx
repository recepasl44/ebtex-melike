import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store';
import { fetchAttendanceStudents } from '../../../slices/attendanceStudent/list/thunk';
import {
    AttendanceStudentsListArg,
    Data as StudentRow,
    Meta as StudentMeta,
} from '../../../types/attendanceStudent/list';
import AttendanceStudentListStatus from '../../../enums/attendanceStudent/list';

export function useAttendanceStudentsTable(
    params: AttendanceStudentsListArg,
) {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(params?.page || 1);
    const [pageSize, setPageSize] = useState<number>(params?.pageSize || 25);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.attendanceStudentList,
    );

    const [filter, setFilter] = useState<any>(null);

    const { enabled = true, ...otherParams } = params;

    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchAttendanceStudents({
                enabled: true,
                ...otherParams,
                filter,
                page,
                pageSize,
                per_page: pageSize,
            }),
        );
    }, [enabled, filter, page, pageSize, dispatch, JSON.stringify(otherParams)]);

    const loading = status === AttendanceStudentListStatus.LOADING;
    const attendanceStudentsData: StudentRow[] = data || [];
    const paginationMeta: StudentMeta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        attendanceStudentsData,
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
