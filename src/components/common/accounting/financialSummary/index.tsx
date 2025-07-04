import { useMemo, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import ReusableTable, { ColumnDefinition } from '../../ReusableTable';
import SpkFlatpickr from '../../../../@spk-reusable-components/reusable-plugins/spk-flatpicker';
import darkcontrol from '../../../../utils/darkmodecontroller';
import { useFinancialSummary } from '../../../hooks/accounting/financial_summary/useFinancialSummary';
import { useDailySummary } from '../../../hooks/accounting/useDailySummary';
import { useSeasonsList } from '../../../hooks/season/useSeasonsList';
import { formatCurrency } from '../../../../utils/formatters';

interface RowData {
  category: string;
  amount: number | string;
}

const DailyTransactionsFinancialSummary: React.FC = () => {
  const [seasonId, setSeasonId] = useState('');
  const [date, setDate] = useState('');
  const [seasonsEnabled, setSeasonsEnabled] = useState(false);

  const { seasonsData = [] } = useSeasonsList({
    enabled: seasonsEnabled,
    page: 1,
    paginate: 100,
  });

  const { summary, loading } = useFinancialSummary({
    season_id: seasonId ? Number(seasonId) : undefined,
    date: date || undefined,
  });

  const { data: dailySummary } = useDailySummary(date || undefined);

  const formatLocalDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const cashInHand = useMemo(() => {
    if (!dailySummary) return 0;
    const paymentsCash = dailySummary.payments.reduce(
      (sum, p) => sum + Number(p.cash || 0),
      0
    );
    const transfersCash = dailySummary.transfers.reduce(
      (sum, t) => sum + Number(t.cash || 0),
      0
    );
    const result = paymentsCash - transfersCash;
    console.log('cashInHand:', result);
    return result;
  }, [dailySummary]);

  const liquidTotal = useMemo(() => {
    const remaining = Number(summary?.liquid_assets.remaining_receivables ?? 0);
    const banksSum =
      summary?.liquid_assets.banks.reduce((acc, b) => acc + Number(b.amount ?? 0), 0) ?? 0;
    const total = cashInHand + remaining + banksSum;
    console.log('liquidTotal parts:', { cashInHand, remaining, banksSum }, '=>', total);
    return total;
  }, [summary, cashInHand]);

  const liabilitiesTotal = useMemo(() => {
    const personnel = Number(summary?.liabilities.personnel_payables ?? 0);
    const supplier = Number(summary?.liabilities.supplier_debts ?? 0);
    const total = personnel + supplier;
    console.log('liabilitiesTotal parts:', { personnel, supplier }, '=>', total);
    return total;
  }, [summary]);

  const cashBoxInfo = useMemo(() => {
    const info =
      liquidTotal > liabilitiesTotal
        ? liquidTotal - liabilitiesTotal
        : liabilitiesTotal - liquidTotal;
    console.log('cashBoxInfo:', info);
    return info;
  }, [liquidTotal, liabilitiesTotal]);

  const liquidRows: RowData[] = useMemo(() => {
    if (!summary) return [];
    const arr: RowData[] = [
      { category: 'Kasa Nakit', amount: cashInHand },
      { category: 'Kalan Alacaklar', amount: summary.liquid_assets.remaining_receivables ?? '-' },
    ];
    summary.liquid_assets.banks.forEach((b) =>
      arr.push({ category: b.bank_name, amount: b.amount ?? '-' })
    );
    return arr;
  }, [summary, cashInHand]);

  const liabilityRows: RowData[] = useMemo(() => {
    if (!summary) return [];
    return [
      { category: 'Personel Ödemeleri', amount: summary.liabilities.personnel_payables ?? '-' },
      { category: 'Tedarikçi Borçları', amount: summary.liabilities.supplier_debts ?? '-' },
    ];
  }, [summary]);

  const columns: ColumnDefinition<RowData>[] = useMemo(
    () => [
      { key: 'category', label: 'Kategori', render: (r) => r.category },
      { key: 'amount', label: 'Tutar', render: (r) => formatCurrency(r.amount) },
    ],
    []
  );

  const textColor = darkcontrol.dataThemeMode === 'dark' ? '#fff' : '#000';

  const liquidFooter = (
    <div className="d-flex justify-content-end fw-bold me-3" style={{ color: textColor }}>
      Toplam: {formatCurrency(liquidTotal)}
    </div>
  );

  const liabilitiesFooter = (
    <div className="d-flex justify-content-end fw-bold me-3" style={{ color: textColor }}>
      Toplam: {formatCurrency(liabilitiesTotal)}
    </div>
  );

  return (
    <div className="container-fluid mt-3">
      <Card className="mb-4 glass-card">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Sezon</Form.Label>
                <Form.Select
                  value={seasonId}
                  onChange={(e) => setSeasonId(e.target.value)}
                  onFocus={() => !seasonsEnabled && setSeasonsEnabled(true)}
                >
                  <option value="">Seçiniz</option>
                  {seasonsData.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tarih</Form.Label>
                <SpkFlatpickr
                  value={date ? new Date(date) : undefined}
                  onfunChange={(dates: Date[]) => {
                    setDate(dates?.length ? formatLocalDate(dates[0]) : '');
                  }}
                  options={{ dateFormat: 'Y-m-d', allowInput: false }}
                  inputClass="form-control"
                  placeholder="Tarih seçiniz"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card className="glass-card h-100">
            <Card.Header as="h5" className="fw-semibold">
              Likit Varlıklar
            </Card.Header>
            <Card.Body className="p-0">
              <ReusableTable<RowData>
                tableMode="single"
                columns={columns}
                data={liquidRows}
                loading={loading}
                showExportButtons={false}
                customFooter={liquidFooter}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
          <Card className="glass-card h-100">
            <Card.Header as="h5" className="fw-semibold">
              Borçlar
            </Card.Header>
            <Card.Body className="p-0">
              <ReusableTable<RowData>
                tableMode="single"
                columns={columns}
                data={liabilityRows}
                loading={loading}
                showExportButtons={false}
                customFooter={liabilitiesFooter}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4 glass-card">
        <Card.Body>
          <div className="d-flex justify-content-end fw-bold me-3" style={{ color: textColor }}>
            Kasa Bilgisi: {formatCurrency(cashBoxInfo)}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DailyTransactionsFinancialSummary;
