import { Table, Card, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { useFinancialSummary } from "../../../hooks/accounting/financial_summary/useFinancialSummary";
import { useSeasonsList } from "../../../hooks/season/useSeasonsList";
import { formatCurrency } from "../../../../utils/formatters";

const FinancialSummary = () => {
  const [seasonId, setSeasonId] = useState("");
  const [date, setDate] = useState("");

  const { seasonsData } = useSeasonsList({ enabled: true, page: 1, paginate: 100 });

  const { summary, loading } = useFinancialSummary({
    season_id: seasonId ? Number(seasonId) : undefined,
    date: date || undefined,
  });

  if (loading) return <div>Loading...</div>;

  const liquidTotal =
    (summary?.liquid_assets.cash || 0) +
    (summary?.liquid_assets.remaining_receivables || 0) +
    (summary?.liquid_assets.banks.reduce((a, b) => a + (b.amount || 0), 0) || 0);

  const liabilitiesTotal =
    (summary?.liabilities.personnel_payables || 0) +
    (summary?.liabilities.supplier_debts || 0);

  return (
    <div className="container mt-3">
      <Form className="mb-4">
        <Row className="g-3 align-items-end">
          <Col xs={12} md={3}>
            <Form.Label>Sezon</Form.Label>
            <Form.Select value={seasonId} onChange={(e) => setSeasonId(e.target.value)}>
              <option value="">Seçiniz</option>
              {(seasonsData || []).map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={3}>
            <Form.Label>Tarih</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Col>
        </Row>
      </Form>

      <Row className="g-3">
        <Col xs={12} md={6}>
          <Card className="custom-card">
            <Card.Body>
              <h5 className="mb-3">Likid Varlıklar</h5>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>Ad</th>
                    <th>Tutar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kasa Nakit</td>
                    <td>{formatCurrency(summary?.liquid_assets.cash)}</td>
                  </tr>
                  <tr>
                    <td>Kalan Alacaklar</td>
                    <td>{formatCurrency(summary?.liquid_assets.remaining_receivables)}</td>
                  </tr>
                  {summary?.liquid_assets.banks.map((b, idx) => (
                    <tr key={idx}>
                      <td>{b.bank_name}</td>
                      <td>{formatCurrency(b.amount)}</td>
                    </tr>
                  ))}
                  <tr className="fw-bold">
                    <td>Toplam</td>
                    <td>{formatCurrency(liquidTotal)}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="custom-card h-100">
            <Card.Body>
              <h5 className="mb-3">Borçlar</h5>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>Ad</th>
                    <th>Tutar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Maaş Ödemeleri</td>
                    <td>{formatCurrency(summary?.liabilities.personnel_payables)}</td>
                  </tr>
                  <tr>
                    <td>Tedarikçi Borçları</td>
                    <td>{formatCurrency(summary?.liabilities.supplier_debts)}</td>
                  </tr>
                  <tr className="fw-bold">
                    <td>Toplam</td>
                    <td>{formatCurrency(liabilitiesTotal)}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FinancialSummary;
