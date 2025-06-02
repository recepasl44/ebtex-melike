import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteAppointment } from '../../../slices/appointments/delete/thunk';

export function useAppointmentDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.appointmentDelete);

    const removeAppointment = useCallback(
        async (appointmentId: number) => {
            const resultAction = await dispatch(deleteAppointment(appointmentId));
            if (deleteAppointment.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deletedAppointmentId: data, status, error, removeAppointment };
}
export default useAppointmentDelete;