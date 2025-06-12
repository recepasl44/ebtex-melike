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
  const [seasonId, setSeasonId] = useState("");
  const [date, setDate] = useState("");

  const { seasonsData } = useSeasonsList({ enabled: true, page: 1, paginate: 100 });

  const { summary, loading } = useFinancialSummary({
    season_id: seasonId ? Number(seasonId) : undefined,
    date: date || undefined,
  });

  const formatLocalDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const liquidTotal =
    (summary?.liquid_assets.cash || 0) +
    (summary?.liquid_assets.remaining_receivables || 0) +
    (summary?.liquid_assets.banks.reduce((a, b) => a + (b.amount || 0), 0) || 0);

  const liabilitiesTotal =
    (summary?.liabilities.personnel_payables || 0) +
    (summary?.liabilities.supplier_debts || 0);

  const liquidRows: RowData[] = useMemo(() => {
    if (!summary) return [];
    const arr: RowData[] = [];
    arr.push({ category: "Kasa Nakit", amount: summary.liquid_assets.cash ?? "-" });
    arr.push({
      category: "Kalan Alacaklar",
      amount: summary.liquid_assets.remaining_receivables ?? "-",
    });
    summary.liquid_assets.banks.forEach((b) => {
      arr.push({ category: b.bank_name, amount: b.amount ?? "-" });
    });
    return arr;
  }, [summary]);

  const liabilityRows: RowData[] = useMemo(() => {
    if (!summary) return [];
    return [
      {
        category: "Maaş Ödemeleri",
        amount: summary.liabilities.personnel_payables ?? "-",
      },
      {
        category: "Tedarikçi Borçları",
        amount: summary.liabilities.supplier_debts ?? "-",
      },
    ];
  }, [summary]);

  const columns: ColumnDefinition<RowData>[] = useMemo(
    () => [
      { key: "category", label: "Kategori", render: (r) => r.category },
      { key: "amount", label: "Tutar", render: (r) => formatCurrency(r.amount) },
    ],
    []
  );


  const liquidFooter = (
    <div
      className="d-flex justify-content-end fw-bold me-3"
      style={{ color: darkcontrol.dataThemeMode === "dark" ? "#fff" : "#000" }}
    >
      Toplam: {formatCurrency(liquidTotal)}
    </div>
  );

  const liabilitiesFooter = (
    <div
      className="d-flex justify-content-end fw-bold me-3"
      style={{ color: darkcontrol.dataThemeMode === "dark" ? "#fff" : "#000" }}
    >
      Toplam: {formatCurrency(liabilitiesTotal)}
    </div>
  );

  return (
    <div className="container-fluid mt-3">
      <Pageheader title="Muhasebe" currentpage="Finansal Özet" />
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Sezon</Form.Label>
                <Form.Select value={seasonId} onChange={(e) => setSeasonId(e.target.value)}>
                  <option value="">Seçiniz</option>
                  {(seasonsData || []).map((s: any) => (
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
                    if (!dates || !dates.length) {
                      setDate("");
                      return;
                    }
                    setDate(formatLocalDate(dates[0]));
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
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <ReusableTable<RowData>
            tableMode="single"
            pageTitle="Likid Varlıklar"
            columns={columns}
            data={liquidRows}
            loading={loading}
            showExportButtons={false}
            customFooter={liquidFooter}
            exportFileName="liquid-assets-summary"
          />
        </Col>
        <Col xs={12} lg={6}>
          <ReusableTable<RowData>
            tableMode="single"
            pageTitle="Borçlar"
            columns={columns}
            data={liabilityRows}
            loading={loading}
            showExportButtons={false}
            customFooter={liabilitiesFooter}
            exportFileName="liabilities-summary"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FinancialSummary;
