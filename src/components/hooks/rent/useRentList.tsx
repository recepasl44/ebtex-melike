import { useState, useEffect } from "react";
import axiosInstance from "../../../services/axiosClient";
import { RENTS } from "../../../helpers/url_helper";

export interface RentItem {
  id: number;
  branch_id: number;
  season_id: number;
  rent_date: string;
  total_rent: string;
}

export interface RentListParams {
  enabled?: boolean;
  page?: number;
  pageSize?: number;
}

export function useRentList(params: RentListParams) {
  const { enabled = true } = params;
  const [page, setPage] = useState<number>(params.page || 1);
  const [pageSize, setPageSize] = useState<number>(params.pageSize || 10);
  const [rentData, setRentData] = useState<RentItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await axiosInstance.get(
          `${RENTS}?page=${page}&paginate=${pageSize}`
        );
        const respData = resp.data;
        setRentData(respData.data || []);
        setTotalPages(respData.meta?.last_page || 1);
        setTotalItems(respData.meta?.total || 0);
      } catch (err: any) {
        setError(err.response?.data?.message || "Fetch rents failed");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [enabled, page, pageSize]);

  return {
    rentData,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    totalItems,
  };
}
