import React, { useMemo, useState } from 'react';
import ReusableTable, { ColumnDefinition, FilterDefinition } from '../../ReusableTable';
import { useDailySummary } from '../../../hooks/accounting/useDailySummary';

interface AuthorizedRow {
  name: string;
  received: number;
  given: number;
  balance: number;
}

const DailyOperationsAuthorizedTable: React.FC = () => {
  const { data, loading } = useDailySummary();
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') || '{}') : {};
  const fullName = userData?.me ? `${userData.me.first_name} ${userData.me.last_name}` : '-';

  const received = useMemo(() => {
    if (!data) return 0;
    return data.payments.reduce((sum, p) => sum + Number(p.total || 0), 0);
  }, [data]);

  const given = useMemo(() => {
    if (!data) return 0;
    return data.transfers.reduce((sum, t) => sum + Number(t.total || 0), 0);
  }, [data]);

  const balance = received - given;

  const rows: AuthorizedRow[] = useMemo(() => [
    { name: fullName, received, given, balance }
  ], [fullName, received, given, balance]);

  const [search, setSearch] = useState('');

  const filteredRows = useMemo(() => {
    if (!search) return rows;
    const term = search.toLocaleLowerCase('tr-TR');
    return rows.filter((r) =>
      r.name.toLocaleLowerCase('tr-TR').includes(term)
    );
  }, [rows, search]);

  const columns: ColumnDefinition<AuthorizedRow>[] = useMemo(() => [
    { key: 'name', label: 'Ad Soyad', render: r => r.name },
    { key: 'received', label: 'Alınan Ücret', render: r => `${r.received.toLocaleString()} ₺` },
    { key: 'given', label: 'Verilen Ücret', render: r => `${r.given.toLocaleString()} ₺` },
    { key: 'balance', label: 'Kalan Ücret', render: r => `${r.balance.toLocaleString()} ₺` },
  ], []);

  const filters: FilterDefinition[] = useMemo(() => [
    {
      key: 'search',
      label: 'Yetkili Ara',
      type: 'text',
      value: search,
      onChange: (val: string) => setSearch(val)
    }
  ], [search]);

  return (
    <div className="container mt-3">
      <ReusableTable<AuthorizedRow>
        // pageTitle="Yetkili İşlemleri"
        columns={columns}
        data={filteredRows}
        loading={loading}
        error={null}
        tableMode="single"
        currentPage={1}
        totalPages={1}
        totalItems={filteredRows.length}
        pageSize={filteredRows.length}
        onPageChange={() => { }}
        onPageSizeChange={() => { }}
        filters={filters}
        showModal={false}
        exportFileName="authorized-operations"
      />
    </div>
  );
};

export default DailyOperationsAuthorizedTable;
