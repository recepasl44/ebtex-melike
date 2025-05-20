
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { fetchClassrooms } from "../../../slices/classrooms/list/thunk";
import {  ClassroomListArg, ClassroomListStatus } from "../../../types/classrooms/list";

export function useClassroomList(params: ClassroomListArg) {
    const dispatch = useDispatch<AppDispatch>();


    const { data, status, error } = useSelector((state: RootState) => state.classroomList);


    const [page, setPage] = useState(params.page ?? 1);
    const [pageSize, setPageSize] = useState(params.pageSize ?? 25);

    useEffect(() => {

        dispatch(fetchClassrooms({
            branchId: params.branchId,
            page,
            pageSize
        }));
    }, [dispatch, params.branchId, page, pageSize]);

    return {
        classroomData: data,
        loading: status === ClassroomListStatus.LOADING,
        error,
        page, setPage,
        pageSize, setPageSize,
    };
}
