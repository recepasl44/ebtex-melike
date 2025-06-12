import { useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
} from "../../ReusableTable";
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

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "season",
        label: "Sezon",
        type: "select",
        value: seasonId,
        onChange: setSeasonId,
        options: (seasonsData || []).map((s: any) => ({
          value: String(s.id),
          label: s.name,
        })),
      },
      {
        key: "date",
        label: "Tarih",
        type: "date",
        value: date,
        onChange: setDate,
      },
    ],
    [seasonId, date, seasonsData]
  );

  const liquidFooter = (
    <div className="d-flex justify-content-end fw-bold me-3">
      Toplam: {formatCurrency(liquidTotal)}
    </div>
  );

  const liabilitiesFooter = (
    <div className="d-flex justify-content-end fw-bold me-3">
      Toplam: {formatCurrency(liabilitiesTotal)}
    </div>
  );

  return (
    <div className="container mt-3">
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <ReusableTable<RowData>
            tableMode="single"
            pageTitle="Likid Varlıklar"
            columns={columns}
            data={liquidRows}
            loading={loading}
            showExportButtons={false}
            filters={filters}
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
