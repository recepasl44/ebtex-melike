import { Table } from "react-bootstrap";
import { useFinancialSummary } from "../../../hooks/accounting/financial_summary/useFinancialSummary";

const FinancialSummary = () => {
  const { summary, loading } = useFinancialSummary();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-3">
      <h5 className="mb-3">Likid Varlıklar</h5>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Tutar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kasa Nakit</td>
            <td>{summary?.liquid_assets.cash}</td>
          </tr>
          <tr>
            <td>Kalan Alacaklar</td>
            <td>{summary?.liquid_assets.remaining_receivables}</td>
          </tr>
          {summary?.liquid_assets.banks.map((b, idx) => (
            <tr key={idx}>
              <td>{b.bank_name}</td>
              <td>{b.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mb-3 mt-4">Borçlar</h5>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Tutar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Maaş Ödemeleri</td>
            <td>{summary?.liabilities.personnel_payables}</td>
          </tr>
          <tr>
            <td>Tedarikçi Borçları</td>
            <td>{summary?.liabilities.supplier_debts}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default FinancialSummary;
