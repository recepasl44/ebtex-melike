import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import ReusableTable, {
  ColumnDefinition,
} from "../ReusableTable";
import FilterGroup, {
  FilterDefinition,
} from "./component/organisms/SearchFilters";
import { useOverduePayments } from "../../hooks/overduePayments/useOverduePayments";
import { OverduePayment } from "../../../types/overduePayments/list";
import { useSeasonsList } from "../../hooks/season/useSeasonsList";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useProgramsTable } from "../../hooks/program/useList";
import { useLevelsTable } from "../../hooks/levels/useList";
import { useClassroomList } from "../../hooks/classrooms/useList";

export default function OverduePaymentsPage() {
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [season, setSeason] = useState("");
  const [branch, setBranch] = useState("");
  const [programId, setProgramId] = useState("");
  const [levelId, setLevelId] = useState("");
  const [classId, setClassId] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState({
    season: false,
    branch: false,
    program: false,
    level: false,
    class: false,
  });

  const [showSmsModal, setShowSmsModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<OverduePayment | null>(null);
  const [smsMessage, setSmsMessage] = useState("Ödemenizi lütfen en kısa sürede yapınız.");

  const handleSendSms = () => {
    console.log("send sms", selectedRow, smsMessage);
    setShowSmsModal(false);
  };

  const { seasonsData } = useSeasonsList({ enabled: filtersEnabled.season, page: 1, paginate: 100 });
  const { branchData } = useBranchTable({ enabled: filtersEnabled.branch });
  const { programsData } = useProgramsTable({
    enabled: !!branch,
    branch_id: branch ? Number(branch) : undefined,
  });
  const { levelsData } = useLevelsTable({
    enabled: !!programId,
    program_id: programId ? Number(programId) : undefined,
  });
  const { classroomData } = useClassroomList({
    enabled: !!levelId,
    branchId: branch ? Number(branch) : undefined,
    program_id: programId ? Number(programId) : undefined,
    level_id: levelId ? Number(levelId) : undefined,
    page: 1,
    pageSize: 100,
  });

  const {
    data: overdueData,
    error,
    current_page,
    total,
    per_page,
    setPage,
    setPaginate,
    searchTerm,
    setSearchTerm,
  } = useOverduePayments();

  const totalPages = Math.ceil(total / per_page);

  const columns: ColumnDefinition<OverduePayment>[] = useMemo(() => [
    { key: "soz_no", label: "Sözleşme No", render: (row) => row.soz_no },
    { key: "okul_no", label: "Okul No", render: (row) => row.okul_no || "-" },
    { key: "tc_kimlik_no", label: "T.C. Kimlik No", render: (row) => row.tc_kimlik_no || "-" },
    {
      key: "adi_soyadi",
      label: "Adı Soyadı",
      render: (row) => `${row.adi ?? ""} ${row.soyadi ?? ""}`.trim() || "-",
    },
    {
      key: "sinif_sube",
      label: "Sınıf/Şube",
      render: (row) =>
        row.sinif ? `${row.sinif}/${row.sube || ""}` : row.sube || "-",
    },
    { key: "veli_adi_soyadi", label: "Veli Adı Soyadı", render: (row) => row.veli_adi_soyadi || "-" },
    { key: "veli_tel", label: "Veli Tel", render: (row) => row.veli_tel || "-" },
    { key: "odeme_tipi", label: "Ödeme Şekli", render: (row) => row.odeme_tipi },
    { key: "taksit_sayisi", label: "Taksit Sayısı", render: (row) => row.taksit_sayisi },
    { key: "vade_gap", label: "Geçen Gün", render: (row) => row.vade_gap },
    { key: "borc", label: "Geciken Tutar", render: (row) => row.borc },
    { key: "percent_of_total", label: "Yüzde", render: (row) => row.percent_of_total },
    { key: "enson_gorusme", label: "Enson Görüşme", render: (row) => row.enson_gorusme || "-" },
    { key: "soz_verme_tarihi", label: "Söz Verme Tarihi", render: (row) => row.soz_verme_tarihi || "-" },
    {
      key: "actions",
      label: "İşlemler",
      render: (row) => (
        <>
          <button
            className="btn btn-icon btn-sm btn-warning-light rounded-pill me-1"
            onClick={() => {
              setSelectedRow(row);
              setShowSmsModal(true);
            }}
          >
            <i className="ti ti-message"></i>
          </button>
          <button
            onClick={() => navigate(`/overdue-payment/${row.soz_no}`)}
            className="btn btn-icon btn-sm btn-primary-light rounded-pill"
          >
            <i className="ti ti-eye" />
          </button>
        </>
      ),
    },
  ], [navigate]);

  const filters: FilterDefinition[] = useMemo(() => [
    {
      key: "date_range",
      label: "Tarih Aralığı",
      type: "doubledate",
      value: dateRange,
      onChange: (val: any) => {
        if (!val) {
          setDateRange({ startDate: "", endDate: "" });
        } else {
          const { startDate, endDate } = val;
          setDateRange({ startDate: startDate || "", endDate: endDate || "" });
        }
        setPage(1);
      },
    },
    {
      key: "season",
      label: "Sezon",
      type: "select",
      value: season,
      options: (seasonsData || []).map((s: any) => ({ value: String(s.id), label: s.name })),
      onClick: () => setFiltersEnabled((p) => ({ ...p, season: true })),
      onChange: (val: string) => {
        setSeason(val);
        setPage(1);
      },
    },
    {
      key: "branch",
      label: "Şube",
      type: "select",
      value: branch,
      options: (branchData || []).map((b: any) => ({ value: String(b.id), label: b.name })),
      onClick: () => setFiltersEnabled((p) => ({ ...p, branch: true })),
      onChange: (val: string) => {
        setBranch(val);
        setPage(1);
      },
    },
    {
      key: "program_id",
      label: "Okul Seviyesi",
      type: "select",
      value: programId,
      options: (programsData || []).map((p: any) => ({ value: String(p.id), label: p.name })),
      onChange: (val: string) => {
        setProgramId(val);
        setPage(1);
      },
    },
    {
      key: "level_id",
      label: "Sınıf Seviyesi",
      type: "select",
      value: levelId,
      options: (levelsData || []).map((l: any) => ({ value: String(l.id), label: l.name })),
      onChange: (val: string) => {
        setLevelId(val);
        setPage(1);
      },
    },
    {
      key: "classroom_id",
      label: "Sınıf/Şube",
      type: "select",
      value: classId,
      options: (classroomData || []).map((c: any) => ({ value: String(c.id), label: c.name })),
      onChange: (val: string) => {
        setClassId(val);
        setPage(1);
      },
    },
    {
      key: "search",
      label: "Adı Soyadı",
      type: "text",
      value: searchTerm,
      onChange: (val: string) => {
        setSearchTerm(val);
        setPage(1);
      },
    },
  ], [dateRange, season, branch, programId, levelId, classId, searchTerm, seasonsData, branchData, programsData, levelsData, classroomData]);

  return (
    <>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={4} />
      <ReusableTable<OverduePayment>
        columns={columns}
        data={overdueData}
        error={error}
        currentPage={current_page}
        totalPages={totalPages}
        totalItems={total}
        pageSize={per_page}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => {
          setPaginate(newSize);
          setPage(1);
        }}
        tableMode="single"
        exportFileName="overdue_payments"
        showExportButtons
      />

      <Modal show={showSmsModal} onHide={() => setShowSmsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>SMS/Bildirim Gönder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Anne" checked disabled />
            <Form.Check type="checkbox" label="Baba" checked disabled />
            <Form.Check type="checkbox" label="Veli" checked disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mesaj</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSmsModal(false)}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleSendSms}>
            Gönder
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
