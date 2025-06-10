import { useMemo } from 'react';
import ReusableTable, { ColumnDefinition, FilterDefinition } from '../ReusableTable';
import { useAuthorizedOperationsTable } from '../../hooks/auth/authorizedOperations/useAuthorizedOperations';
import { AuthorizedOperation } from '../../../types/auth/authorizedOperations';

export default function DailyOperationsAuthorizedTable() {
  const {
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
  } = useAuthorizedOperationsTable();

  const columns: ColumnDefinition<AuthorizedOperation>[] = useMemo(
    () => [
      { key: 'full_name', label: 'Ad Soyad' },
      {
        key: 'taken_amount',
        label: 'Al\u0131nan \u00dccret',
        render: r => `${Number(r.taken_amount).toLocaleString()} \u20BA`,
      },
      {
        key: 'given_amount',
        label: 'Verilen \u00dccret',
        render: r => `${Number(r.given_amount).toLocaleString()} \u20BA`,
      },
      {
        key: 'remaining_amount',
        label: 'Kalan \u00dccret',
        render: r => `${Number(r.remaining_amount).toLocaleString()} \u20BA`,
      },
    ],
    []
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: 'search',
        label: 'Ad Soyad',
        type: 'text',
        value: searchTerm,
        onChange: (val: string) => {
          setSearchTerm(val);
          setPage(1);
        },
      },
    ],
    [searchTerm, setPage]
  );

  return (
    <ReusableTable<AuthorizedOperation>
      pageTitle="Yetkili \u0130\u015flemleri"
      columns={columns}
      data={data}
      loading={loading}
      error={error}
      tableMode="single"
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize);
        setPage(1);
      }}
      filters={filters}
      showExportButtons
      exportFileName="authorized_operations"
    />
  );
}
