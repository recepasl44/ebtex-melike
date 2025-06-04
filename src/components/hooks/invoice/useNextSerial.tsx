import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchNextSerial } from "../../../slices/invoice/nextSerial/thunk";
import { NextSerialStatus } from "../../../enums/invoice/nextSerial";

export function useNextSerial() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (s: RootState) => s.nextSerial
    );

    // return the dispatch(...) so callers can await + unwrap
    const getNextSerial = useCallback(() => {
        return dispatch(fetchNextSerial());
    }, [dispatch]);

    return {
        serial: data?.serial_no ?? null,
        status,
        error,
        getNextSerial,
        isLoading: status === NextSerialStatus.LOADING,
    };
}
