import { useState } from "react";
import axiosInstance from "../../../services/axiosClient";
import { RENTS } from "../../../helpers/url_helper";

export interface RentUpdatePayload {
  branch_id: number;
  season_id: number;
  rent_date: string;
  total_rent: number;
}

export function useRentUpdate() {
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED'>('IDLE');
  const [error, setError] = useState<string | null>(null);

  const updateRent = async (rentId: number, payload: RentUpdatePayload) => {
    try {
      setStatus('LOADING');
      const resp = await axiosInstance.put(`${RENTS}/${rentId}`, payload);
      setStatus('SUCCEEDED');
      return resp.data.data;
    } catch (err: any) {
      setStatus('FAILED');
      setError(err.response?.data?.message || 'Update rent failed');
      return null;
    }
  };

  return { status, error, updateRent };
}
