import { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../../services/axiosClient';
import { DAILY_SUMMARY } from '../../../helpers/url_helper';

export interface PaymentSummary {
  category: string;
  cash: number | string;
  creditCard: number | string;
  other: number | string;
  total: number | string;
  description?: string;
}

export interface TransferSummary {
  type: string;
  cash: number | string;
  bank: number | string;
  total: number | string;
  description?: string;
}

export interface DailySummaryData {
  payments: PaymentSummary[];
  transfers: TransferSummary[];
}

export function useDailySummary(date?: string) {
  const [data, setData] = useState<DailySummaryData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const url = date ? `${DAILY_SUMMARY}?date=${date}` : DAILY_SUMMARY;
      const resp = await axiosInstance.get(url);
      setData(resp.data);
    } catch {
      // ignore errors
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}