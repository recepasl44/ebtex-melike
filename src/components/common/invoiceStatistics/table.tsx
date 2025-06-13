import { useMemo, useState } from "react";
import { Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import Pageheader from "../page-header/pageheader";
import {
  useInvoiceStatistics,
  InvoiceStatisticsItem,
} from "../../hooks/invoice/useInvoiceStatistics";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useSeasonsList } from "../../hooks/season/useSeasonsList";
import { formatCurrency } from "../../../utils/formatters";

interface StudentDetail {
  branch_name: string;
  tc_no: string;
  full_name: string;
  level: string;
  classroom: string;
  parent_name: string;
  parent_relation: string;
  parent_phone: string;
  amount: number;
  invoices?: any[];
}

interface StudentInvoice {
  [key: string]: any;
}

const monthsOptions = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}`,
}));

const InvoiceStatisticsTable = () => {
  const [branchId, setBranchId] = useState("");
  const [seasonId, setSeasonId] = useState("");
  const [months, setMonths] = useState<string[]>([]);

  const [branchEnabled, setBranchEnabled] = useState(false);
  const [seasonEnabled, setSeasonEnabled] = useState(false);

  const { branchData = [] } = useBranchTable({ enabled: branchEnabled });
  const { seasonsData = [] } = useSeasonsList({ enabled: seasonEnabled, page: 1, paginate: 100 });

  const { data, loading } = useInvoiceStatistics({
    enabled: true,
    branch_id: branchId ? Number(branchId) : undefined,
    season_id: seasonId ? Number(seasonId) : undefined,
    months: months.map(Number),
  });

  const [selectedRow, setSelectedRow] = useState<InvoiceStatisticsItem | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentDetail | null>(null);
  const [showStudentInvoices, setShowStudentInvoices] = useState(false);

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
          <Button size="sm" onClick={() => { setSelectedRow(r); setShowDetail(true); }}>
            Detay
          </Button>
        ),
      },
    ],
    []
  );

  const total = data.reduce((a, b) => a + (b.total_amount || 0), 0);

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3">Toplam: {total.toLocaleString()} ₺</div>
  );

  const studentColumns: ColumnDefinition<StudentDetail>[] = useMemo(
    () => [
      { key: "branch_name", label: "Şube" },
      { key: "tc_no", label: "T.C. Kimlik No" },
      { key: "full_name", label: "Adı Soyadı" },
      { key: "level", label: "Sınıf Seviyesi" },
      { key: "classroom", label: "Sınıf/Şube" },
      { key: "parent_name", label: "Veli Adı Soyadı" },
      { key: "parent_relation", label: "Veli Yakınlığı" },
      { key: "parent_phone", label: "Veli Telefon" },
      {
        key: "amount",
        label: "Fatura Tutarı",
        render: (r) => `${r.amount.toLocaleString()} ₺`,
      },
      {
        key: "student_actions",
        label: "İşlemler",
        render: (r) => (
          <Button
            size="sm"
            onClick={() => {
              setSelectedStudent(r);
              setShowStudentInvoices(true);
            }}
          >
            Detay
          </Button>
        ),
      },
    ],
    []
  );

  const studentTotal = (selectedRow?.students || []).reduce(
    (sum: number, s: any) => sum + (s.amount || 0),
    0
  );

  const studentFooter = (
    <div className="d-flex justify-content-end fw-bold me-3">
      Toplam: {formatCurrency(studentTotal)}
    </div>
  );

  const invoiceColumns: ColumnDefinition<StudentInvoice>[] = useMemo(() => {
    if (!selectedStudent?.invoices || selectedStudent.invoices.length === 0) {
      return [
        { key: "issue_date", label: "Tarih", render: (r) => r.issue_date || r.date },
      ];
    }
    const first = selectedStudent.invoices[0] as Record<string, any>;
    const keys = Object.keys(first).filter((k) => k !== "issue_date" && k !== "date");
    const cols: ColumnDefinition<StudentInvoice>[] = [
      { key: "issue_date", label: "Tarih", render: (r) => r.issue_date || r.date },
    ];
    keys.forEach((k) => {
      cols.push({
        key: k,
        label: k,
        render: (r) => formatCurrency(r[k]),
      });
    });
    return cols;
  }, [selectedStudent]);

  const invoiceTotal = (selectedStudent?.invoices || []).reduce((sum, inv: any) => {
    const keys = Object.keys(inv).filter((k) => k !== "issue_date" && k !== "date");
    const total = keys.reduce((s, k) => s + (Number(inv[k]) || 0), 0);
    return sum + total;
  }, 0);

  const invoiceFooter = (
    <div className="d-flex justify-content-end fw-bold me-3">
      Toplam: {formatCurrency(invoiceTotal)}
    </div>
  );

  return (
    <div className="container-fluid mt-3">
      <Pageheader title="Faturalar" currentpage="Fatura İstatistikleri" />
      <Card className="mb-4 glass-card">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Şube</Form.Label>
                <Form.Select
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  onFocus={() => setBranchEnabled(true)}
                >
                  <option value="">Seçiniz</option>
                  {branchData.map((b) => (
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
                  onFocus={() => setSeasonEnabled(true)}
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
            <Col md={4}>
              <Form.Group>
                <Form.Label>Ay</Form.Label>
                <Form.Select
                  multiple
                  value={months}
                  onChange={(e) =>
                    setMonths(Array.from(e.target.selectedOptions, (o) => o.value))
                  }
                >
                  {monthsOptions.map((m) => (
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
        tableMode="single"
        columns={columns}
        data={data}
        loading={loading}
        showExportButtons
        customFooter={footer}
      />
      <Modal size="lg" show={showDetail} onHide={() => setShowDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detay</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReusableTable<StudentDetail>
            tableMode="single"
            columns={studentColumns}
            data={(selectedRow?.students as StudentDetail[]) || []}
            showExportButtons
            customFooter={studentFooter}
          />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={showStudentInvoices} onHide={() => setShowStudentInvoices(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Fatura Detayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReusableTable<StudentInvoice>
            tableMode="single"
            columns={invoiceColumns}
            data={(selectedStudent?.invoices as StudentInvoice[]) || []}
            showExportButtons
            customFooter={invoiceFooter}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default InvoiceStatisticsTable;
