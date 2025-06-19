import { useMemo, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import Pageheader from "../../../page-header/pageheader";
import SpkFlatpickr from "../../../../@spk-reusable-components/reusable-plugins/spk-flatpicker";
import darkcontrol from "../../../../utils/darkmodecontroller";
import { useFinancialSummary } from "../../../hooks/accounting/financial_summary/useFinancialSummary";
import { useSeasonsList } from "../../../hooks/season/useSeasonsList";
import { formatCurrency } from "../../../../utils/formatters";

interface RowData {
  category: string;
  amount: number | string;
}

const FinancialSummary = () => {
  /** ------------- Filtreler ------------------ */
  const [seasonId, setSeasonId] = useState("");
  const [date, setDate] = useState("");

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

  /* Yardımcılar */
  const formatLocalDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  /** ------------- Satır / Toplam hesapları ---- */
  const liquidTotal =
    (summary?.liquid_assets.cash ?? 0) +
    (summary?.liquid_assets.remaining_receivables ?? 0) +
    (summary?.liquid_assets.banks.reduce((a, b) => a + (b.amount ?? 0), 0) ?? 0);

  const liabilitiesTotal =
    (summary?.liabilities.personnel_payables ?? 0) +
    (summary?.liabilities.supplier_debts ?? 0);

  const liquidRows: RowData[] = useMemo(() => {
    if (!summary) return [];
    const arr: RowData[] = [
      { category: "Kasa Nakit", amount: summary.liquid_assets.cash ?? "-" },
      { category: "Kalan Alacaklar", amount: summary.liquid_assets.remaining_receivables ?? "-" },
    ];
    summary.liquid_assets.banks.forEach(b =>
      arr.push({ category: b.bank_name, amount: b.amount ?? "-" })
    );
    return arr;
  }, [summary]);

  const liabilityRows: RowData[] = useMemo(() => {
    if (!summary) return [];
    return [
      { category: "Maaş Ödemeleri", amount: summary.liabilities.personnel_payables ?? "-" },
      { category: "Tedarikçi Borçları", amount: summary.liabilities.supplier_debts ?? "-" },
    ];
  }, [summary]);

  const columns: ColumnDefinition<RowData>[] = useMemo(
    () => [
      { key: "category", label: "Kategori", render: r => r.category },
      { key: "amount", label: "Tutar", render: r => formatCurrency(r.amount) },
    ],
    []
  );

  /** ------------- Footer bileşenleri ---------- */
  const textColor = darkcontrol.dataThemeMode === "dark" ? "#fff" : "#000";

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

  /** ------------- Render ---------------------- */
  return (
    <div className="container-fluid mt-3">
      <Pageheader title="Muhasebe" currentpage="Finansal Özet" />

      {/* ------ Filtreler kartı ------ */}
      <Card className="mb-4 glass-card">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Sezon</Form.Label>
                <Form.Select
                  value={seasonId}
                  onChange={e => setSeasonId(e.target.value)}
                  onFocus={() => !seasonsEnabled && setSeasonsEnabled(true)}
                >
                  <option value="">Seçiniz</option>
                  {seasonsData.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
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
                    setDate(dates?.length ? formatLocalDate(dates[0]) : "");
                  }}
                  options={{ dateFormat: "Y-m-d", allowInput: false }}
                  inputClass="form-control"
                  placeholder="Tarih seçiniz"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* ------ Tablolar ------ */}
      <Row className="g-4">
        {/* Likit Varlıklar */}
        <Col xs={12} lg={6}>
          <Card className="glass-card h-100">
            <Card.Header as="h5" className="fw-semibold">Likit Varlıklar</Card.Header>
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

        {/* Borçlar */}
        <Col xs={12} lg={6}>
          <Card className="glass-card h-100">
            <Card.Header as="h5" className="fw-semibold">Borçlar</Card.Header>
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
    </div>
  );
};

export default FinancialSummary;
