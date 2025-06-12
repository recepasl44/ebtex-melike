import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchAppointment } from '../../../slices/appointments/detail/thunk';

export function useAppointmentDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.appointmentDetail);

    const getAppointment = useCallback(
        async (appointmentId: number) => {
            const resultAction = await dispatch(fetchAppointment(appointmentId));
            if (fetchAppointment.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { appointment: data, status, error, getAppointment };
}