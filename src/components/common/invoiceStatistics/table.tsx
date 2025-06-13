import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Form } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import Pageheader from "../page-header/pageheader";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useSeasonsList } from "../../hooks/season/useSeasonsList";
import { useInvoiceStatistics, InvoiceStatisticsItem } from "../../hooks/invoice/useInvoiceStatistics";

const months = [
  { value: "1", label: "Ocak" },
  { value: "2", label: "Şubat" },
  { value: "3", label: "Mart" },
  { value: "4", label: "Nisan" },
  { value: "5", label: "Mayıs" },
  { value: "6", label: "Haziran" },
  { value: "7", label: "Temmuz" },
  { value: "8", label: "Ağustos" },
  { value: "9", label: "Eylül" },
  { value: "10", label: "Ekim" },
  { value: "11", label: "Kasım" },
  { value: "12", label: "Aralık" },
];

export default function InvoiceStatisticsTable() {
  const navigate = useNavigate();
  const [seasonId, setSeasonId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const { branchData } = useBranchTable({ enabled: true });
  const { seasonsData } = useSeasonsList({ enabled: true });

  const { data, loading, error } = useInvoiceStatistics({
    enabled: true,
    season_id: seasonId ? Number(seasonId) : undefined,
    branch_id: branchId ? Number(branchId) : undefined,
    months: selectedMonths.map(Number),
  });

  const columns: ColumnDefinition<InvoiceStatisticsItem>[] = useMemo(
    () => [
      { key: "season_name", label: "Sezon", render: (r) => r.season_name },
      { key: "branch_name", label: "Şube", render: (r) => r.branch_name },
      { key: "month", label: "Tarih", render: (r) => r.month },
      {
        key: "total_amount",
        label: "Fatura Tutarı",
        render: (r) => `${r.total_amount.toLocaleString()} ₺`,
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (r) => (
          <button
            className="btn btn-icon btn-sm btn-info-light rounded-pill"
            onClick={() =>
              navigate(
                `/invoice/stat/detail?season_id=${seasonId}&branch_id=${branchId}&month=${r.month}`
              )
            }
          >
            <i className="ti ti-eye" />
          </button>
        ),
      },
    ],
    [navigate, seasonId, branchId]
  );

  const totalAmount = useMemo(() => {
    return data.reduce((sum, item) => sum + (item.total_amount || 0), 0);
  }, [data]);

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3">
      Toplam: {totalAmount.toLocaleString()} ₺
    </div>
  );

  return (
    <>
      <Pageheader title="Fatura İstatistiği" currentpage="Fatura İstatistiği" />
      <Card className="mb-3">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Şube</Form.Label>
                <Form.Select
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {branchData?.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Sezon</Form.Label>
                <Form.Select
                  value={seasonId}
                  onChange={(e) => setSeasonId(e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  {seasonsData?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Ay</Form.Label>
                <Form.Select
                  multiple
                  value={selectedMonths}
                  onChange={(e) =>
                    setSelectedMonths(
                      Array.from(e.target.selectedOptions, (o) => o.value)
                    )
                  }
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ReusableTable<InvoiceStatisticsItem>
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        showModal={false}
        showExportButtons
        tableMode="single"
        customFooter={footer}
      />
    </>
  );
}
