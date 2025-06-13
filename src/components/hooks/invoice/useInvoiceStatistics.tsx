import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosClient";

export interface InvoiceStatisticsItem {
  season_name: string;
  branch_name: string;
  month: string;
  total_amount: number;
  students?: any[];
}

export interface InvoiceStatisticsArgs {
  enabled?: boolean;
  season_id?: number;
  branch_id?: number;
  months?: number[];
}

export function useInvoiceStatistics(args: InvoiceStatisticsArgs) {
  const { enabled = true, ...params } = args;
  const [data, setData] = useState<InvoiceStatisticsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const query = new URLSearchParams();
    if (params.season_id) query.append("season_id", String(params.season_id));
    if (params.branch_id) query.append("branch_id", String(params.branch_id));
    if (params.months && params.months.length)
      query.append("months", params.months.join(","));
    const url = `/invoice/summery${query.toString() ? `?${query.toString()}` : ""}`;
    setLoading(true);
    axiosInstance
      .get(url)
      .then((resp) => {
        setData(resp.data?.data || []);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Fetch failed");
      })
      .finally(() => setLoading(false));
  }, [enabled, params.season_id, params.branch_id, params.months]);

  return { data, loading, error };
}
