import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCES_SUMMARY } from "../../../../helpers/url_helper";
import { ExpenseSummaryData } from "../../../../utils/generateExpenseCardData";

export function useExpenseSummaryCards() {
  const [rangeData, setRangeData] = useState<ExpenseSummaryData | null>(null);
  const [totalData, setTotalData] = useState<ExpenseSummaryData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTotal = useCallback(async () => {
    try {
      const resp = await axiosInstance.get(EXPENCES_SUMMARY);
      setTotalData(resp.data.data as ExpenseSummaryData);
    } catch {
      // ignore errors for now
    }
  }, []);

  const fetchRange = useCallback(async (start = "", end = "") => {
    setLoading(true);
    try {
      const url = `${EXPENCES_SUMMARY}?start_date=${start}&end_date=${end}`;
      const resp = await axiosInstance.get(url);
      setRangeData(resp.data.data as ExpenseSummaryData);
    } catch {
      // ignore errors for now
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTotal();
    fetchRange();
  }, [fetchTotal, fetchRange]);

  const handleDateRangeChange = useCallback(
    (selectedDates: Date[]) => {
      if (selectedDates.length === 2) {
        const startDate = selectedDates[0]?.toISOString().split("T")[0] || "";
        const endDate = selectedDates[1]?.toISOString().split("T")[0] || "";
        fetchRange(startDate, endDate);
      }
    },
    [fetchRange]
  );

  return { rangeData, totalData, loading, handleDateRangeChange };
}