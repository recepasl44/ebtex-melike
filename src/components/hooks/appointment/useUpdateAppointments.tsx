import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateAppointment } from '../../../slices/appointments/update/thunk';
import { AppoipmentPayload } from '../../../types/appoipments/update';

export function useAppointmentUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.appointmentUpdate);

    const updateExistingAppointment = useCallback(
        async (payload: AppoipmentPayload) => {
            const resultAction = await dispatch(updateAppointment(payload));
            if (updateAppointment.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedAppointment: data, status, error, updateExistingAppointment };
}

