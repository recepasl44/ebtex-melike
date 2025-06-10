import { useEffect, useState } from 'react';
import axiosInstance from '../../../../services/axiosClient';
import { AUTHORIZED_OPERATIONS } from '../../../../helpers/url_helper';
import { AuthorizedOperation, AuthorizedOperationListResponse } from '../../../../types/auth/authorizedOperations';

export function useAuthorizedOperationsTable() {
  const [data, setData] = useState<AuthorizedOperation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `${AUTHORIZED_OPERATIONS}?page=${page}&paginate=${pageSize}`;
        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }
        const resp = await axiosInstance.get(url);
        const respData = resp.data as AuthorizedOperationListResponse;
        setData(respData.data || []);
        setTotalPages(respData.meta?.last_page ?? 1);
        setTotalItems(respData.meta?.total ?? respData.data.length);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Fetch authorized operations failed');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, pageSize, searchTerm]);

  return {
    data,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize,
    searchTerm,
    setSearchTerm,
  };
}
