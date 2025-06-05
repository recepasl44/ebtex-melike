import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
  FilterDefinition,
  useDebounce,
} from "../../ReusableTable";
import { useListStudents } from "../../../hooks/student/useList";
import { IStudent } from "../../../../types/student/list";
import { Button } from "react-bootstrap";
import { useLevelsTable } from "../../../hooks/levels/useList";
import { useProgramsTable } from "../../../hooks/program/useList";
import { useBranchTable } from "../../../hooks/branch/useBranchList";
import { useUpdateQueryParamsFromFilters } from "../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import { usePersonnelTable } from "../../../hooks/employee/personel/useList";
import { deleteStudent } from "../../../../slices/student/delete/thunk";
import appointment_button from "../../../../assets/images/media/appoipment-buton.svg";
import appointment_hover from "../../../../assets/images/media/appoipment-buton-hover.svg";
import { formatDateForApi } from "../../../../utils/formatters";
import Pageheader from "../../../page-header/pageheader";

type QueryParams = {
  [x: string]: any;
  program_id: number;
  level_id: number;
  branch: string;
  page: number;
  student_id: number;
  date_range: string[];
};

export default function StudentListPage() {
  const navigate = useNavigate();
  const [program_id, setProgramId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [branch, setBranch] = useState("");
  const [student_id, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [inputName, setInputName] = useState(""); // UI için
  const debouncedName = useDebounce<string>(inputName, 500);
  const [created_by, setCreatedBy] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState({
    date: false,
    branch: false,
    program_id: false,
    level: false,
    first_name: false,
    level_id: false,
    student_id: false,
    authorized_person: false,
    startDate: false,
    endDate: false,
  });

  const {
    data,
    loading,
    error,

    totalPages,
    totalItems,

  } = useListStudents({
    program_id: program_id ? program_id : "",
    level_id: level_id ? Number(level_id) : undefined,
    student_id: student_id ? Number(student_id) : undefined,
    firstName: firstName || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    branch_id: branch ? Number(branch) : undefined,
    created_by: created_by || undefined,
  });

  const { branchData: branchData } = useBranchTable({
    enabled: filtersEnabled.branch,
  });

  const { programsData } = useProgramsTable({
    enabled: !!branch, // şube seçilirse etkin
    branch_id: branch ? Number(branch) : undefined,
  });

  const { levelsData } = useLevelsTable({
    enabled: !!program_id, // program seçilirse etkin
    program_id,
  });

  // Görüşme Yetkilisi seçenekleri
  const { personnelData } = usePersonnelTable({
    enabled: !!level_id, // Her zaman etkin olması sağlanıyor
    level_id,
    pozisyon: ["MÜDÜR,ÖĞRETMEN"],
  });

  const { data: studentNameData } = useListStudents({
    enabled: filtersEnabled.first_name,
    first_name: firstName,
    page: 1,
    pageSize: 100,
  });

  const authorized_personOptions = useMemo(
    () =>
      personnelData.map((m) => {
        const name = m.ad || m.pozisyon || "Adı Belirtilmedi";
        return {
          value: name,
          label: name,
        };
      }),
    [personnelData]
  );

  useListStudents({
    enabled: filtersEnabled.first_name,
    page: 1,
    pageSize: 100,
  });
  const handleFilterChange = (key: string, value: string) => {
    setFiltersEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "branch") {
      setBranch(value);
    }
    if (key === "program_id") {
      setProgramId(value);
    }
    if (key === "doubledate") {
      if (typeof value === "object" && value !== null) {
        const { startDate: start, endDate: end } = value;
        setDate(`${start} - ${end}`); // Display için string format
        setStartDate(start);
        setEndDate(end);
      } else {
        console.error("Beklenmeyen değer formatı:", value);
      }
    }
    if (key === "level_id") {
      setLevelId(value);
    }
    if (key === "first_name") {
      setInputName(value);
    }
    if (key === "student_id") {
      setStudentId(value);
    }
    if (key === "created_by") {
      setCreatedBy(value);
    }
    if (key === "startDate") {
      setStartDate(value);
    }
    if (key === "endDate") {
      setEndDate(value);
    }
  };

  useEffect(() => {
    if (debouncedName) {
      // firstName güncellemesi
      setFirstName(debouncedName);
      // API isteği için filtersEnabled güncellenmesi
      setFiltersEnabled((prev) => ({
        ...prev,
        first_name: true,
      }));
    }
  }, [debouncedName]);

  const filtersState = useMemo(
    () => ({
      program_id: Number(program_id) || 0,
      level_id: Number(level_id) || 0,
      student_id: Number(student_id) || 0,
      first_name: firstName || "",
      branch: branch || "",
      page: 1,
      enabled: false,
      date_range: [startDate ? startDate : "", endDate ? endDate : ""],
    }),
    [

      startDate,
      endDate,
      program_id,
      level_id,
      branch,
      student_id,
      firstName,
    ]
  );
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    query.set("paginate", String(params.page));
    query.set("startDate", String(params.date_range[0]));
    query.set("endDate", String(params.date_range[1]));
    navigate(`?${query.toString()}`);
  };
  const levelParams = useMemo(
    () => ({
      enabled: program_id ? true : false,
      program_id: program_id,
    }),
    [program_id]
  );
  useUpdateQueryParamsFromFilters<QueryParams>(filtersState, updateQueryParams);
  const { levelsData: programLevelsData } = useLevelsTable(levelParams);
  const filters = useMemo(() => {
    const basicFilters: FilterDefinition[] = [
      {
        key: "date_range",
        label: "Tarih",
        type: "doubledate",
        value: [startDate, endDate],
        onChange: (dates: any) => {
          if (!dates) {
            handleFilterChange("startDate", "");
            handleFilterChange("endDate", "");
            return;
          }
          const start_date = dates.startDate || "";
          const end_date = dates.endDate || "";
          // API için uygun formatta tarihleri formatla
          const formattedStartDate = start_date
            ? formatDateForApi(start_date)
            : "";
          const formattedEndDate = end_date ? formatDateForApi(end_date) : "";

          // Formatlanmış tarihleri state'e kaydet
          handleFilterChange("startDate", formattedStartDate);
          handleFilterChange("endDate", formattedEndDate);
        },
      },
      {
        key: "branch",
        label: "Şube",
        value: branch,
        type: "select",
        onClick: () => {
          setFiltersEnabled((prev) => ({ ...prev, branch: true }));
        },
        onChange: (val: any) => {
          handleFilterChange("branch", val);
        },
        options: (branchData || []).map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
      },
      {
        key: "program_id",
        label: "Okul seviyesi",
        value: program_id,
        type: "select",
        onClick: () => {
          setFiltersEnabled((prev) => ({ ...prev, program_id: true }));
        },
        onChange: (val: any) => {
          handleFilterChange("program_id", val);
        },
        options: (programsData || []).map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
      },
      {
        key: "level_id",
        label: "Sınıf Seviyesi",
        value: level_id,
        type: "select",
        onChange: (val: any) => {
          handleFilterChange("level_id", val);
        },
        onClick: () => {
          setFiltersEnabled((prev) => ({ ...prev, level_id: true }));
        },
        options: (programLevelsData || []).map((item) => ({
          label: item.name,
          value: String(item.id),
        })),
      },
      {
        key: "created_by",
        label: "Kayıt Eden",
        value: created_by,
        type: "select",
        onClick: () => {
          // Herhangi bir koşul olmadan etkinleştir
          setFiltersEnabled((prev) => ({ ...prev, authorized_person: true }));
        },
        onChange: (val: any) => {
          handleFilterChange("created_by", val);
        },
        options: (authorized_personOptions || []).map((item) => ({
          label: item.label,
          value: item.value,
        })),
      },
      {
        key: "first_name",
        label: "Öğrenci Adı",
        value: inputName,
        type: "autocomplete",
        onChange: (val: any) => {
          setInputName(val);
          if (val) {
            const matchedStudent = studentNameData?.find(
              (item: any) => item.first_name.toLowerCase() === val.toLowerCase()
            );
            if (matchedStudent) {
              // Seçilen öğrencinin bilgilerini ayarla
              if (matchedStudent.id) {
                setStudentId(matchedStudent.id.toString());
              }
              if (matchedStudent.first_name) {
                setFirstName(matchedStudent.first_name);
              }
            }
          } else {
            setStudentId("");
            setFirstName("");
          }
        },
        options: (studentNameData || []).map((item: any) => ({
          label: `${item.first_name || ""} ${item.last_name || ""}`,
          value: item.first_name || "",
          id: item.id,
        })),
      },
    ];
    return basicFilters;
  }, [
    branchData,
    branch,
    level_id,
    date,
    programsData,
    levelsData,
    programLevelsData,
    studentNameData,
    inputName,
  ]);
  const columns: ColumnDefinition<IStudent>[] = useMemo(
    () => [
      {
        key: "identification_no",
        label: "TC Kimlik",
      },
      {
        key: "gender_id",
        label: "Cinsiyet",
        render: (row: any) => (row?.gender_id == 1 ? "Kadın" : "Erkek"),
      },
      {
        key: "first_name",
        label: "Ad",
        render: (row) => (row.first_name ? row.first_name : "-"),
      },
      {
        key: "last_name",
        label: "Soyad",
        render: (row) => (row?.last_name ? row.last_name : "-"),
      },
      {
        key: "program",
        label: "Okul Seviyesi",
        render: (row) => row?.program?.name,
      },
      {
        key: "level",
        label: "Sınıf Seviyesi",
        render: (row) => (row?.level?.name ? row?.level?.name : "-"),
      },
      {
        key: "category",
        label: "Alan",
        render: (row) =>
          row?.program?.category ? row?.program?.category : "-",
      },
      {
        key: "parent",
        label: "Veli Ad Soyad",
        render: (row) => {
          if (!row.parent) return "-";
          return `${row.parent.full_name || ""}`.trim() || "-";
        },
      },
      {
        key: "phone",
        label: "Veli Cep",
        render: (row) => {
          if (!row.parent) return "-";
          return `${row.parent.phone || ""}`.trim() || "-";
        },
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row: any, openDeleteModal: any) => (
          <>
            <div style={{ display: "flex", gap: "5px" }}>
              {/* Detay (Profil) */}{" "}
              <Button
                variant="primary-light"
                size="sm"
                className="btn-icon rounded-pill"
                onClick={() => navigate(`/pre-register/${row.id}/details`)}
              /* öğrenci detay sayfası eklenmemiş */
              >
                <i className="ti ti-eye"></i>
              </Button>
              {/* Düzenle */}
              <Button
                variant="info-light"
                size="sm"
                className="btn-icon rounded-pill"
                onClick={() => navigate(`/pre-register/crud/${row.id}`)}
              >
                <i className="ti ti-pencil"></i>
              </Button>
              {/* Sil */}
              <Button
                variant="danger-light"
                size="sm"
                className="btn-icon rounded-pill"
                onClick={() => openDeleteModal && openDeleteModal(row)}
              >
                <i className="ti ti-trash"></i>
              </Button>
              {/* Görüşme */}
              <Button
                variant="warning-light"
                size="sm"
                className="btn-icon rounded-pill"
                onClick={() =>
                  navigate(`/studentmeetings?student_id=${row.id}`)
                }
              >
                <i className="ti ti-message"></i>
              </Button>
              {/* Randevu */}
              <Button
                variant=""
                size="sm"
                onClick={() =>
                  navigate(`/appointmentsdetail?student_id=${row.id}`)
                }
              >
                <img
                  src={appointment_button}
                  alt="Seç"
                  style={{
                    width: "28px",
                    height: "28px",
                    margin: "-10px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.src = appointment_hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.src = appointment_button)
                  }
                />
              </Button>
            </div>
          </>
        ),
      },
    ],
    [navigate]
  );

  // Pager options


  return (
    <div className="px-4">
      {/* <Pageheader title="Öğrenci Yönetimi" currentpage="Ön Kayıt / Liste" /> */}
      <ReusableTable<IStudent>
        onAdd={() => navigate(`/pre-register/crud`)}
        // pageTitle="Ön Kayıt / Liste"
        exportFileName="students"
        showExportButtons={true}
        columns={columns}
        data={data}
        filters={filters}
        loading={loading}
        error={error}

        totalPages={totalPages}
        totalItems={totalItems}

        tableMode="single"

        onDeleteRow={(row) => {
          deleteStudent(row.id);
        }}
      />
    </div>
  );
}
