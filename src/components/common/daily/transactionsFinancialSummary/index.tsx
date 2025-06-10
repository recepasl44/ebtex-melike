import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axiosInstance from '../../../../services/axiosClient';
import { FINANCIAL_SUMMARY } from '../../../../helpers/url_helper';

interface SummaryRow {
  category: string;
  cash: number | string;
  credit_card: number | string;
  other: number | string;
  total: number | string;
  description?: string;
}

const defaultData: SummaryRow[] = [
  { category: 'Nakit', cash: 0, credit_card: 0, other: 0, total: 0, description: '' },
];

const TransactionsFinancialSummary = () => {
  const [rows, setRows] = useState<SummaryRow[]>(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      try {
        const resp = await axiosInstance.get(FINANCIAL_SUMMARY);
        const data =
          resp.data?.transactions ||
          resp.data?.data?.transactions ||
          null;
        if (data && Array.isArray(data) && data.length > 0) {
          setRows(data as SummaryRow[]);
        }
      } catch {
        // ignore errors, fallback to default data
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-3">
      <Table bordered hover>
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Nakit</th>
            <th>Kredi Kartı</th>
            <th>Diğer</th>
            <th>Toplam</th>
            <th>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx}>
              <td>{r.category}</td>
              <td>{r.cash}</td>
              <td>{r.credit_card}</td>
              <td>{r.other}</td>
              <td>{r.total}</td>
              <td>{r.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionsFinancialSummary;
