import { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosClient';
import { DAILY_SUMMARY } from '../../../helpers/url_helper';

export interface PaymentSummaryRow {
  category: string;
  cash: string;
  credit_card: string;
  other: string;
  total: string;
  description?: string;
}

export interface TransferSummaryRow {
  type: string;
  cash: string;
  bank: string;
  total: string;
  description?: string;
}

export interface DailySummaryResponse {
  payments: PaymentSummaryRow[];
  transfers: TransferSummaryRow[];
}

export function useDailySummary() {
  const [data, setData] = useState<DailySummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        setLoading(true);
        const resp = await axiosInstance.get(DAILY_SUMMARY);
        setData(resp.data.data as DailySummaryResponse);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch summary');
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  return { data, loading, error };
}
