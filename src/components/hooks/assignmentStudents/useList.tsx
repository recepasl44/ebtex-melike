import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchAssignmentStudents } from '../../../slices/assignmentStudents/list/thunk';
import {
    AssignmentStudentsListArg,
    AssignmentStudentData,
    AssignmentStudentsMeta
} from '../../../types/assignmentStudents/list';
import AssignmentStudentsListStatus from '../../../enums/assignmentStudents/list';

export function useAssignmentStudentsList(params: AssignmentStudentsListArg) {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(params.page || 1);
    const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
    const [filter, setFilter] = useState<any>(null);
    const { data, meta, status, error } = useSelector(
        (state: RootState) => state.assignmentStudentsList
    );

    const buildQuery = () => {
        const { enabled, ...rest } = params;
        return {
            ...rest,
            filter,
            page,
            pageSize,
            per_page: pageSize,
        } as AssignmentStudentsListArg;
    };

    useEffect(() => {
        if (params?.enabled === false) return;
        dispatch(fetchAssignmentStudents(buildQuery()));
    }, [dispatch, filter, page, pageSize, params]);

    const loading = status === AssignmentStudentsListStatus.LOADING;
    const assignmentStudentsData: AssignmentStudentData[] = data || [];
    const paginationMeta: AssignmentStudentsMeta | null = meta;
    const totalPages = paginationMeta ? paginationMeta.last_page : 1;
    const totalItems = paginationMeta ? paginationMeta.total : 0;

    return {
        assignmentStudentsData,
        loading,
        error,
        page,
        setPage,
        pageSize,
        setPageSize,
        filter,
        setFilter,
        totalPages,
        totalItems,
    };
}
