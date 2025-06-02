import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addAppointment } from '../../../slices/appointments/add/thunk';
import { AppoipmentPayload } from '../../../types/appoipments/add';

export function useAppointmentAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.appointmentAdd);

    const addNewAppointment = useCallback(
        async (payload: AppoipmentPayload) => {
            const resultAction = await dispatch(addAppointment(payload));
            if (addAppointment.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedAppointment: data, status, error, addNewAppointment };
}
