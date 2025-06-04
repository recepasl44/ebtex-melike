import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store';
import { fetchAttendanceTeachers } from '../../../slices/attendanceTeacher/list/thunk';
import {
    AttendanceTeachersListArg,
    Data as TeacherRow,
    Meta as TeacherMeta,
} from '../../../types/attendanceTeacher/list';
import AttendanceTeacherListStatus from '../../../enums/attendanceTeacher/list';

export function useAttendanceTeachersTable(
    params: AttendanceTeachersListArg,
) {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(params?.page || 1);
    const [pageSize, setPageSize] = useState<number>(params?.pageSize || 25);

    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.attendanceTeacherList,
    );

    const [filter, setFilter] = useState<any>(null);

    const { enabled = true, ...otherParams } = params;

    useEffect(() => {
        if (!enabled) return;

        dispatch(
            fetchAttendanceTeachers({
                enabled: true,
                ...otherParams,
                filter,
                page,
                pageSize,
                per_page: pageSize,
            }),
        );
    }, [enabled, filter, page, pageSize, dispatch, JSON.stringify(otherParams)]);

    const loading = status === AttendanceTeacherListStatus.LOADING;
    const attendanceTeachersData: TeacherRow[] = data || [];
    const paginationMeta: TeacherMeta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        attendanceTeachersData,
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
