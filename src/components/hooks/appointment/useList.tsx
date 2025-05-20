import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchAppointment } from '../../../slices/appointments/list/thunk';
import { AppointmentResponse, AppointmentArgs } from '../../../types/appoipments/list';
import { AppoipmenthListStatus } from '../../../enums/appoipments/list'

export function useAppointmentList(params: AppointmentArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [filter, setFilter] = useState<any>(null);

  const { data, meta, status, error } = useSelector((state: RootState) => state.test);

  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(fetchAppointment({
      ...otherParams,
      filter,
    }));
  }, [enabled, filter, dispatch, otherParams.branch_id, otherParams.appointment_type, otherParams.appointment_time, otherParams.school_level, otherParams.class_level, otherParams.page, otherParams.pageSize, otherParams.first_name, otherParams.student_id]);


  const loading = status === AppoipmenthListStatus.LOADING;
  const appointmentData: AppointmentResponse['data'] = data || [];
  const paginationMeta = meta;
  const totalPages = paginationMeta ? paginationMeta.last_page : 1;
  const totalItems = paginationMeta ? paginationMeta.total : 0;

  return {
    appointmentData,
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
