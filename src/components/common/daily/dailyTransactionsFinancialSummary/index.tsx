import { useMemo, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import ReusableTable, { ColumnDefinition } from '../../ReusableTable';
import SpkFlatpickr from '../../../../@spk-reusable-components/reusable-plugins/spk-flatpicker';
import darkcontrol from '../../../../utils/darkmodecontroller';
import { useFinancialSummary } from '../../../hooks/accounting/financial_summary/useFinancialSummary';
import { useSeasonsList } from '../../../hooks/season/useSeasonsList';
import { formatCurrency } from '../../../../utils/formatters';

interface RowData {
  category: string;
  type: 'Likit Varlıklar' | 'Borçlar';
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

  const formatLocalDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const allRows: RowData[] = useMemo(() => {
    if (!summary) return [];

    const rows: RowData[] = [
      { type: 'Likit Varlıklar', category: 'Nakit', amount: summary.liquid_assets.cash ?? '-' },
      { type: 'Likit Varlıklar', category: 'Kalan Alacaklar', amount: summary.liquid_assets.remaining_receivables ?? '-' },
    ];

    summary.liquid_assets.banks.forEach((b, index) => {
      rows.push({ type: 'Likit Varlıklar', category: `${index + 1}.Banka`, amount: b.amount ?? '-' });
    });

    // Manuel olarak örnek ek alanlar
    rows.push({ type: 'Likit Varlıklar', category: 'Çek', amount: 250000 });
    rows.push({ type: 'Likit Varlıklar', category: 'Farklı', amount: 400000 });

    rows.push({ type: 'Borçlar', category: 'Maaş Ödemeleri', amount: 10000000 });
    rows.push({ type: 'Borçlar', category: 'SSK Ödemeleri', amount: 1500000 });
    rows.push({ type: 'Borçlar', category: 'Tedarikçi-1', amount: 300000 });
    rows.push({ type: 'Borçlar', category: 'Tedarikçi-2', amount: 400000 });
    rows.push({ type: 'Borçlar', category: 'Tedarikçi-3', amount: 55000 });
    rows.push({ type: 'Borçlar', category: 'Tedarikçi-4', amount: 123000 });
    rows.push({ type: 'Borçlar', category: 'bakım', amount: 80000 });
    rows.push({ type: 'Borçlar', category: 'iadeler', amount: 30000 });
    rows.push({ type: 'Borçlar', category: 'Kiralar', amount: 600000 });
    rows.push({ type: 'Borçlar', category: 'Vergiler', amount: 650000 });
    rows.push({ type: 'Borçlar', category: 'Elektrik', amount: 300000 });
    rows.push({ type: 'Borçlar', category: 'Su', amount: 23000 });
    rows.push({ type: 'Borçlar', category: 'Enerji', amount: 32000 });
    rows.push({ type: 'Borçlar', category: 'İnternet', amount: 13000 });

    return rows;
  }, [summary]);

  const liquidTotal = useMemo(() => {
    return allRows
      .filter((r) => r.type === 'Likit Varlıklar')
      .reduce((sum, row) => sum + (typeof row.amount === 'number' ? row.amount : 0), 0);
  }, [allRows]);

  const liabilitiesTotal = useMemo(() => {
    return allRows
      .filter((r) => r.type === 'Borçlar')
      .reduce((sum, row) => sum + (typeof row.amount === 'number' ? row.amount : 0), 0);
  }, [allRows]);

  const columns: ColumnDefinition<RowData>[] = useMemo(
    () => [
      { key: 'type', label: 'Tür', render: (r) => r.type },
      { key: 'category', label: 'Kategori', render: (r) => r.category },
      { key: 'amount', label: 'Tutar', render: (r) => formatCurrency(r.amount) },
    ],
    []
  );

  const textColor = darkcontrol.dataThemeMode === 'dark' ? '#fff' : '#000';

  const footer = (
    <div className="d-flex flex-column justify-content-end align-items-end fw-bold me-3" style={{ color: textColor }}>
      <div>Toplam Likit Varlıklar: {formatCurrency(liquidTotal)}</div>
      <div>Toplam Borçlar: {formatCurrency(liabilitiesTotal)}</div>
    </div>
  );

  return (
    <div className="container-fluid mt-3">
      {/* Filters */}
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

      {/* Unified Table */}
      <Row className="g-4">
        <Col xs={12}>
          <Card className="glass-card">
            <Card.Header as="h5" className="fw-semibold">
              Günlük Finansal Durum
            </Card.Header>
            <Card.Body className="p-0">
              <ReusableTable<RowData>
                tableMode="single"
                columns={columns}
                data={allRows}
                loading={loading}
                showExportButtons={false}
                customFooter={footer}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DailyTransactionsFinancialSummary;
