import { useState } from "react";
import axiosInstance from "../../../services/axiosClient";
import { RENTS } from "../../../helpers/url_helper";

export function useRentDelete() {
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED'>('IDLE');
  const [error, setError] = useState<string | null>(null);

  const removeRent = async (id: number): Promise<boolean> => {
    try {
      setStatus('LOADING');
      await axiosInstance.delete(`${RENTS}/${id}`);
      setStatus('SUCCEEDED');
      return true;
    } catch (err: any) {
      setStatus('FAILED');
      setError(err.response?.data?.message || 'Delete rent failed');
      return false;
    }
  };

  return { status, error, removeRent };
}
