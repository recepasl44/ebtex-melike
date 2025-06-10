import { Table } from 'react-bootstrap';
import { useFinancialSummary } from '../../hooks/accounting/financial_summary/useFinancialSummary';

interface RowData {
  category: string;
  cash: number | string;
  creditCard: number | string;
  other: number | string;
  total: number | string;
  description?: string;
}

const DailyTransactionsFinancialSummary = () => {
  const { summary, loading } = useFinancialSummary();

  if (loading) return <div>Loading...</div>;

  const rows: RowData[] = [];

  if (summary) {
    rows.push({
      category: 'Kasa Nakit',
      cash: summary.liquid_assets?.cash ?? '-',
      creditCard: '-',
      other: '-',
      total: summary.liquid_assets?.cash ?? '-',
    });
    rows.push({
      category: 'Kalan Alacaklar',
      cash: summary.liquid_assets?.remaining_receivables ?? '-',
      creditCard: '-',
      other: '-',
      total: summary.liquid_assets?.remaining_receivables ?? '-',
    });

    summary.liquid_assets?.banks?.forEach((b) => {
      rows.push({
        category: b.bank_name,
        cash: '-',
        creditCard: b.amount ?? '-',
        other: '-',
        total: b.amount ?? '-',
      });
    });

    rows.push({
      category: 'Personel Ödemeleri',
      cash: '-',
      creditCard: '-',
      other: summary.liabilities?.personnel_payables ?? '-',
      total: summary.liabilities?.personnel_payables ?? '-',
    });

    rows.push({
      category: 'Tedarikçi Borçları',
      cash: '-',
      creditCard: '-',
      other: summary.liabilities?.supplier_debts ?? '-',
      total: summary.liabilities?.supplier_debts ?? '-',
    });
  }

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
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.category}</td>
              <td>{row.cash}</td>
              <td>{row.creditCard}</td>
              <td>{row.other}</td>
              <td>{row.total}</td>
              <td>{row.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DailyTransactionsFinancialSummary;
