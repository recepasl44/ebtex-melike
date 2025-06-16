import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation, data } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
} from "../../ReusableTable";
import { useMeetingsList } from "../../../hooks/meetings/useList";
import { Meeting } from "../../../../types/meetings/list";
import { Button, Modal } from "react-bootstrap";
import { useBranchTable } from "../../../hooks/branch/useBranchList";
import { useMeetingDelete } from "../../../hooks/meetings/useDelete";
import { useListStudents } from "../../../hooks/student/useList";
import { useUpdateQueryParamsFromFilters } from "../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import { useLevelsTable } from "../../../hooks/levels/useList";
import { useProgramsTable } from "../../../hooks/program/useList";
import info from "../../../../assets/images/media/info.svg";
import info_hover from "../../../../assets/images/media/info-hover.svg";
import SpkPopovers from "../../../../@spk-reusable-components/reusable-uielements/spk-popovers";
import { formatCurrency } from "../../../../utils/formatters";
import inside from "../../../../assets/images/media/svg/inside-button.svg";
import outside from "../../../../assets/images/media/svg/outside-button.svg";

type QueryParams = {
  [x: string]: any;
  branch: number;
  type_id: number;
  meeting_date: string;
  program_id: number;
  level_id: number;
  student_id: number;
};

export default function MeetingListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [branch, setBranch] = useState("");
  const [meeting_type, setMeetingType] = useState("");
  const [meeting_date, setMeetingDate] = useState("");
  const [program_id, setProgramId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [student_id, setStudentId] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filtersEnabled, setFilterEnabled] = useState({
    branch: false,
    type_id: false,
    meeting_date: false,
    program_id: false,
    level_id: false,
    first_name: false,
    student_id: false,
  });

  // useListStudents hook'unu yeni mantıkla çağıralım
  const { data: studentNameData } = useListStudents({
    enabled: false, // İlk açılışta API çağrısı yapılmayacak
    first_name: first_name, // Kullanıcının girdiği değeri gönderiyoruz
  });

  // Initialize values from URL params if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("branch")) setBranch(params.get("branch") || "");
    if (params.get("type_id")) setMeetingType(params.get("type_id") || "");
    if (params.get("meeting_date"))
      setMeetingDate(params.get("meeting_date") || "");
    if (params.get("program_id")) setProgramId(params.get("program_id") || "");
    if (params.get("level_id")) setLevelId(params.get("level_id") || "");
    if (params.get("student_id")) setStudentId(params.get("student_id") || "");
    if (params.get("page")) setPage(Number(params.get("page")) || 1);
    if (params.get("pageSize"))
      setPageSize(Number(params.get("pageSize")) || 10);
  }, [location.search]);

  useMeetingDelete();

  const handleShowModal = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { branchData: branchData } = useBranchTable({
    enabled: filtersEnabled.branch,
  });

  const { programsData: programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
  });

  const { levelsData } = useLevelsTable({
    enabled: filtersEnabled.level_id,
    page: 1,
    pageSize: 100,
  });

  useListStudents({
    enabled: filtersEnabled.first_name,
    page: 1,
    pageSize: 100,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilterEnabled((prev) => ({ ...prev, [key]: true }));
    if (key === "branch") {
      setBranch(value);
    }
    if (key === "type_id") {
      setMeetingType(value);
    }
    if (key === "meeting_date") {
      setMeetingDate(value);
    }
    if (key === "program_id") {
      setProgramId(value);
    }
    if (key === "level_id") {
      setLevelId(value);
    }
    if (key === "first_name") {
      setFirstName(value);
    }
    if (key === "student_id") {
      setStudentId(value);
    }
  };

  // `filtersState` güncelleniyor ve URL parametrelerini yönetiyoruz
  const filtersState = useMemo(
    () => ({
      branch: Number(branch) || 0,
      type_id: Number(meeting_type) || 0,
      meeting_date: meeting_date || "",
      program_id: Number(program_id) || 0,
      level_id: Number(level_id) || 0,
      first_name: first_name || "",
      student_id: Number(student_id) || 0,
    }),
    [
      branch,
      meeting_type,
      meeting_date,
      program_id,
      level_id,
      first_name,
      student_id,
    ]
  );

  // URL parametrelerini güncelleme
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    query.set("branch", String(params.branch));
    query.set("type_id", String(params.type_id));
    query.set("meeting_date", params.meeting_date);
    query.set("program_id", String(params.program_id));
    query.set("level_id", String(params.level_id));
    // first_name gönderilmiyor, sadece student_id gönderiliyor
    query.set("student_id", String(params.student_id));
    query.set("pageSize", String(pageSize));
    query.set("enabled", String(params.enabled));

    navigate(`?${query.toString()}`);
  };

  // URL parametrelerini güncelleme fonksiyonu
  useUpdateQueryParamsFromFilters<QueryParams>(filtersState, updateQueryParams);

  const levelParams = useMemo(
    () => ({
      enabled: program_id ? true : false,
      program_id: program_id,
    }),
    [program_id]
  );

  const { levelsData: programLevelsData } = useLevelsTable(levelParams);

  // Filtrelerin seçeneklerini (options) oluşturuyoruz
  const filters = useMemo(() => {
    const basicFilters = [
      {
        key: "branch",
        label: "Şube",
        value: branch,
        type: "select" as const,
        onClick: () => {
          setFilterEnabled((prev) => ({ ...prev, branch: true }));
        },
        onChange: (val: string) => {
          handleFilterChange("branch", val);
        },
        options: (branchData || []).map((item) => ({
          value: String(item.id),
          label: item.name,
          key: item.id,
        })),
      },
      {
        key: "type_id",
        label: "Görüşme Tipi",
        value: meeting_type,
        type: "select" as const,
        onChange: (val: string) => {
          handleFilterChange("type_id", val);
        },
        options: [
          { label: "hepsi", value: "2" },
          { label: "yüzyüze", value: "0" },
          { label: "uzaktan", value: "1" },
        ],
      },
      {
        key: "meeting_date",
        label: "Randevu Zamanı",
        type: "date" as const,
        value: meeting_date,
        onChange: (val: string) => {
          handleFilterChange("meeting_date", val);
        },
      },
      {
        key: "program_id",
        label: "Okul seviyesi",
        value: program_id,
        type: "select" as const,
        onClick: () => {
          setFilterEnabled((prev) => ({ ...prev, program_id: true }));
        },
        onChange: (val: string) => {
          handleFilterChange("program_id", val);
        },
        options: (programsData || []).map((item) => ({
          value: String(item.id),
          label: item.name,
          key: item.id,
        })),
      },
      {
        key: "level_id",
        label: "Sınıf Seviyesi",
        value: level_id,
        type: "select" as const,
        onChange: (val: string) => {
          handleFilterChange("level_id", val);
        },
        options: (programLevelsData || []).map((item) => ({
          value: String(item.id),
          label: item.name,
        })),
      },
      {
        key: "first_name",
        label: "Adı Soyadı",
        value: first_name,
        type: "autocomplete" as const,

        onChange: (val: string) => {
          if (val) {
            const matchedStudent = studentNameData?.find((item) =>
              item.first_name.toLowerCase().includes(val.toLowerCase())
            );
            if (matchedStudent) {
              if (matchedStudent.id) {
                setStudentId(matchedStudent.id.toString());
              }
              if (matchedStudent.first_name) {
                setFirstName(matchedStudent.first_name);
              }
              data(val);
            }
          }
          setFirstName(val);
        },
        options: (studentNameData || []).map((item) => ({
          value: item.first_name,
          label: item.first_name,
        })),
      },
    ];
    return basicFilters;
  }, [
    branchData,
    branch,
    meeting_type,
    meeting_date,
    program_id,
    level_id,
    programsData,
    levelsData,
    programLevelsData,
    studentNameData,
  ]);

  const questionParams = useMemo(
    () => ({
      enabled: true,
      page: page,
      pageSize: pageSize,
      branch_id: Number(branch) || undefined,
      type_id: Number(meeting_type) || undefined,
      meeting_date: meeting_date || undefined,
      program_id: Number(program_id) || undefined,
      level_id: Number(level_id) || undefined,
    }),
    [branch, meeting_type, meeting_date, program_id, level_id, page, pageSize]
  );

  const { meetingsData, loading, error, totalPages, totalItems } =
    useMeetingsList(questionParams);

  const columns: ColumnDefinition<Meeting>[] = useMemo(
    () => [
      {
        key: "type_id",
        label: "İç / Dış",
        render: (row) => {
          if (row.type_id === 0) {
            return (
              <img
                src={inside}
                alt="inside"
                className="inside-button"
                style={{ width: 28, height: 28 }}
              />
            );
          } else if (row.type_id === 1) {
            return (
              <img
                src={outside}
                alt="outside"
                className="inside-button"
                style={{ width: 28, height: 28 }}
              />
            );
          }
        },
      },

      {
        key: "branche",
        label: "Şube",
        render: (row) =>
          row.branche ? String((row.branche as { name: string }).name) : "-",
      },
      {
        key: "meeting_date",
        label: "Tarih",
        render: (row) => (row.meeting_date ? row.meeting_date : "-"),
      },
      {
        key: "season",
        label: "Sezon",
        render: (row) =>
          row.season ? String((row.season as { name: string }).name) : "-",
      },
      {
        key: "type_id",
        label: "Tür",
        render: (row) => {
          if (row.type_id === 0) {
            return "Yüzyüze";
          } else if (row.type_id === 1) {
            return "Uzaktan";
          }
        },
      },
      {
        key: "id",
        label: "Kayıt No",
        render: (row) => (row.student_id ? row.student_id : "-"),
      },
      {
        key: "identification_number",
        label: "TC Kimlik No",
        render: (row) =>
          row.student
            ? String(
              (row.student as { identification_no: string }).identification_no
            )
            : "-",
      },
      {
        key: "first_name",
        label: "Adı",
        render: (row) =>
          row.student
            ? String((row.student as { first_name: string }).first_name)
            : "-",
      },
      {
        key: "last_name",
        label: "Soyadı",
        render: (row) =>
          row.student
            ? String((row.student as { last_name: string }).last_name)
            : "-",
      },
      {
        key: "level_id",
        label: "Sınıf Seviyesi",
        render: (row) =>
          row.student ? String((row.student as { level: string }).level) : "-",
      },
      {
        key: "parent",
        label: "Veli Adı",
        render: (row) =>
          row.student
            ? String((row.student as { parent: string }).parent)
            : "-",
      },
      {
        key: "parent_phone",
        label: "Veli Cep",
        render: (row) =>
          row.student
            ? String((row.student as { mobile_phone: string }).mobile_phone)
            : "-",
      },
      {
        key: "meeting_price",
        label: "Ücret",
        render: (row) =>
          row.meeting_price ? String(row.meeting_price) : "-",
      },
      {
        key: "meeting_note",
        label: "Görüşme Durumu",
        render: (row) => row.meeting_note || "-",
      },
      {
        key: "registration_price",
        label: "Kayıt Fiyatı",
        render: (row) => {
          const enroll = (row.student as any)?.enrollments?.[0];
          const price = enroll?.final_fee ?? enroll?.total_fee;
          return price ? formatCurrency(price, true) : "-";
        },
      },
      {
        key: "created_by",
        label: "Kayıt Eden",
        render: (row) => (row.created_by ? String(row.created_by) : "-"),
      },
      {
        key: "meeting_by",
        label: "Görüşme Yetkilisi",
        render: (row) => (row.meeting_by ? String(row.meeting_by) : "-"),
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <>
            <SpkPopovers
              trigger="hover"
              placement="top"
              title="Not"
              content={row.meeting_note || "-"}
            >
              <Button variant="link">
                <img
                  src={info}
                  alt="Seç"
                  style={{
                    width: "28px",
                    height: "28px",
                    margin: "-20px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.src = info_hover)}
                  onMouseLeave={(e) => (e.currentTarget.src = info)}
                />
              </Button>
            </SpkPopovers>{" "}
            <Button
              variant="warning-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => handleShowModal(row)}
            >
              <i className="ti ti-message"></i>
            </Button>{" "}
          </>
        ),
      },
    ],
    [navigate, handleShowModal]
  );

  return (
    <>
      <ReusableTable<Meeting>
        columns={columns}
        data={meetingsData}
        loading={loading}
        error={error}
        showModal={false}
        showExportButtons={true}
        filters={filters}
        tableMode="single"
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        exportFileName="meetings"
        currentPage={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Öğrenci Görüşmeleri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMeeting && (
            <div>
              <p>Görüşme Tarihi: {selectedMeeting.meeting_date}</p>
              <p>
                Season:{' '}
                {selectedMeeting.season
                  ? (selectedMeeting.season as any).name
                  : '-'}
              </p>
              <p>
                Şube:{' '}
                {selectedMeeting.branche
                  ? (selectedMeeting.branche as any).name
                  : '-'}
              </p>
              <p>
                Öğrenci:{' '}
                {(selectedMeeting.student as any)?.first_name ?? ''}{' '}
                {(selectedMeeting.student as any)?.last_name ?? ''}
              </p>
              <p>
                Görüşme Tipi:{' '}
                {selectedMeeting.type_id === 0
                  ? 'Yüzyüze'
                  : selectedMeeting.type_id === 1
                  ? 'Uzaktan'
                  : '-'}
              </p>
              <p>Not: {selectedMeeting.meeting_note}</p>
              <p>Oluşturan: {selectedMeeting.created_by}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
