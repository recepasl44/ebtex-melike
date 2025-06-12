import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { Button } from "react-bootstrap";
import { useProgramsTable } from "../../../hooks/program/useList";
import { useLevelsTable } from "../../../hooks/levels/useList";
import { useSchoolTable } from "../../../hooks/school/useSchoolList";

import { useAppointmentList } from "../../../hooks/appointment/useList";
import { useQuestionDelete } from "../../../hooks/questions/useDelete";

import { data } from "../../../../types/appoipments/list";
import { useUpdateQueryParamsFromFilters } from "../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import { useBranchTable } from "../../../hooks/branch/useBranchList";

import { useListStudents } from "../../../hooks/student/useList";
import { useAppointmentDelete } from "../../../hooks/appointment/deleteAppointment";
import appoipmentButtonHover from "../../../../assets/images/media/appoipment-buton-hover.svg";
import appoipmentButton from "../../../../assets/images/media/appoipment-buton.svg";

type QueryParams = {
  [x: string]: any;
  page: number;
  branches: number;
  Appointment: number;
  Appointment_time: string;
  Program_id: number;
  Class_level: number;
  first_name: string;
  student_id: number;
  pageSize: number;
};

export default function QuestionLabeling() {
  const navigate = useNavigate();
  const [branch, setBranch] = useState("");
  const [appointment_type, setAppointment_type] = useState("");
  const [appointment_time, setAppointment_time] = useState("");
  const [program_id, setProgram_id] = useState("");
  const [Class_level, setClass_level] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [student_id, setStudent_id] = useState("");

  const { removeAppointment } = useAppointmentDelete();

  const [filtersEnabled, setFiltersEnabled] = useState({
    branch: false,
    appointment: false,
    appointment_time: false,
    program_id: false,
    Class_level: false,
    first_name: false,
    student_id: false,
  });

  useQuestionDelete();

  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { branchData } = useBranchTable({
    enabled: filtersEnabled.branch,
  });

  // useSchoolTable'dan refetch fonksiyonunu alıyoruz
  const { programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
  });

  const { } = useSchoolTable({
    enabled: filtersEnabled.Class_level,
    page: 1,
    pageSize: 100,
  });

  const { data } = useListStudents({
    enabled: first_name !== "" ? true : false,
    first_name: first_name,
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
      setProgram_id(value);
    }
    if (key === "class_level") {
      setClass_level(value);
    }
    if (key === "first_name") {
      setFirst_name(value);
    }
  };

  const filtersState = useMemo(
    () => ({
      branches: Number(branch) || 0,
      Appointment: Number(appointment_type) || 0,
      Appointment_time: String(appointment_time) || "",
      Program_id: Number(program_id) || 0,
      Class_level: Number(Class_level) || 0,
      first_name: String(first_name) || "",
      student_id: 0,
      page: 1,
      pageSize,
      enabled: true,
    }),
    [
      branch,
      appointment_type,
      appointment_time,
      program_id,
      Class_level,
      first_name,
      student_id,
      pageSize,
    ]
  );

  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    query.set("page", String(params.page));
    query.set("branch_id", String(params.branches));
    query.set("Appointment", String(params.Appointment));
    query.set("Appointment_time", String(params.Appointment_time));
    query.set("Program_id", String(params.Program_id));
    query.set("Class_level", String(params.Chapters));
    query.set("pageSize", String(params.pageSize));
    query.set("enabled", String(params.enabled));
    query.set("student_id", String(params.student_id));
    navigate(`?${query.toString()}`);
  };

  useUpdateQueryParamsFromFilters<QueryParams>(filtersState, updateQueryParams);

  const school_levelParams = useMemo(
    () => ({
      enabled: program_id ? true : false,
      paginate: pageSize,
      program_id: Number(program_id) || 0,
    }),
    [pageSize, program_id]
  );

  const { levelsData } = useLevelsTable(school_levelParams);

  const appointmentParams = useMemo(
    () => ({
      enabled: true,
      paginate: pageSize,
      page,
      branch_id: Number(branch) || 0,
      appointment_type: Number(appointment_type) || 0,
      appointment_time: String(appointment_time) || "",
      class_level: Number(Class_level) || 0,
      first_name: String(first_name) || "",
      student_id: Number(student_id) || 0,

      per_page: pageSize,
    }),
    [
      pageSize,
      page,
      branch,
      appointment_type,
      appointment_time,
      Class_level,
      student_id,
    ]
  );

  const {
    appointmentData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: _updatePage,
    setPageSize: _updateTablePageSize,
  } = useAppointmentList(appointmentParams);
  // Filtre seçeneklerini oluşturma
  const filters = useMemo(() => {
    const basicFilters = [
      {
        key: "branches",
        label: "Şube",
        value: branch,
        onClick: () => {
          setFiltersEnabled((prev) => ({ ...prev, branch: true }));
        },
        onChange: (val: string) => {
          handleFilterChange("branch", val);
        },
        options: (branchData || []).map((p: any) => ({
          value: String(p.id),
          label: p.name,
          key: p.id,
        })),
      },
      {
        key: "appointment_type",
        label: "Görüşme Tipi",
        value: appointment_type,
        onChange: (val: string) => {
          setAppointment_type(val);
          setFiltersEnabled((prev) => ({ ...prev, appointment: true }));
        },
        options: [
          { label: "yüzyüze", value: "1" },
          { label: "uzaktan", value: "2" },
          { label: "hepsi", value: "3" },
        ],
      },
      {
        key: "appointment_time",
        label: "Randevu Zamanı",
        value: appointment_time,
        type: "date" as const,
        onChange: (val: string) => {
          setAppointment_time(val);
          setFiltersEnabled((prev) => ({ ...prev, appointment_time: true }));
        },
      },
      {
        key: "program_id",
        label: "Okul Seviyesi",
        value: program_id,
        onClick: () => {
          setFiltersEnabled((prev) => ({ ...prev, program_id: true }));
        },
        onChange: (val: string) => {
          handleFilterChange("program_id", val);
        },
        options: (programsData || []).map((u: any) => ({
          value: String(u.id),
          label: u.name,
        })),
      },
      {
        key: "class_level",
        label: "Sınıf Seviyesi",
        value: Class_level,
        onClick: () => {
          setFiltersEnabled((prev) => ({ ...prev, class_level: true }));
        },
        onChange: (val: string) => handleFilterChange("class_level", val),
        options: (levelsData || []).map((c: any) => ({
          value: c.id,
          label: c.name,
        })),
      },
      {
        key: "first_name",
        label: "Adı Soyadı",
        value: first_name,
        type: "autocomplete" as const,

        onChange: (val: string) => {
          if (val) {
            const matchedStudent = data?.find((item: { label: string }) =>
              item.label.toLowerCase().includes(val.toLowerCase())
            );

            if (matchedStudent) {
              setFirst_name(matchedStudent.label);
              setStudent_id(String(matchedStudent.value));
            } else {
              setFirst_name(val);
            }
          } else {
            setFirst_name("");
          }

          handleFilterChange("first_name", val);
        },
        onClick: () => {
          setFiltersEnabled((prev) => ({ ...prev, first_name: true }));
        },
        options: (data || []).map((item: { label: any }) => ({
          value: item.label,
          label: item.label,
        })),
      },
    ];
    return basicFilters;
  }, [
    branch,
    appointment_type,
    appointment_time,
    program_id,
    Class_level,
    first_name,
    branchData,
    programsData,
    levelsData,
    first_name,
    student_id,
  ]);

  const columns: ColumnDefinition<data>[] = useMemo(
    () => [
      {
        key: "branches",
        label: "Şube",
        render: (row) => row.branche?.name ?? "",
      },
      {
        key: "appointment_time",
        label: "Randevu Zamanı",
        render: (row) => row.meeting_date ?? "",
      },

      {
        key: "appointment_type",
        label: "Tür",
        render: (row) => {
          if (row.type_id === 1) return "Yüzyüze";
          if (row.type_id === 2) return "Uzaktan";
          return "-";
        },
      },

      {
        key: "identification_no",
        label: "TC Kimlik No",

        render: (row) => row.student?.identification_no ?? "",
      },

      {
        key: "first_name",
        label: "Adı Soyadı",

        render: (row) =>
          (row.student?.first_name ?? "-") +
          " " +
          (row.student?.last_name ?? ""),
      },

      {
        key: "level",
        label: "Sınıf Seviyesi",
        render: (row) =>
          (row.student?.level as { name: string } | undefined)?.name ?? "-",
      },
      {
        key: "parent_id",
        label: "Veli Adı",
        render: (row) => row.student?.parent?.full_name ?? "-",
      },
      {
        key: "meeting_note",
        label: "Görüşme Durumu",
        render: (row: data) => row.meeting_by ?? "-",
      },

      {
        key: "actions",
        label: "Actions",
        render: (row) => (
          <>
            <Button
              variant="warning-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => navigate(`/studentmeetings?student_id=${row.id}`)}
            >
              <i className="ti ti-message"></i>
            </Button>{" "}
            <Button
              variant=""
              size="sm"
              onClick={() =>
                navigate(`/appointmentsdetail?student_id=${row.id}`)
              }
            >
              <img
                src={appoipmentButton}
                alt="Seç"
                style={{
                  width: "28px",
                  height: "28px",
                  margin: "-10px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.src = appoipmentButtonHover)
                }
                onMouseLeave={(e) => (e.currentTarget.src = appoipmentButton)}
              />
            </Button>
          </>
        ),
      },
    ],
    [navigate]
  );

  return (
    <ReusableTable<data>
      columns={columns}
      // pageTitle="Randevu Listesi"
      data={appointmentData as data[]}
      loading={loading}
      showModal={false}
      showExportButtons={true}
      tableMode="single"
      error={error}
      filters={filters}
      currentPage={page}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={(newPage) => {
        setPage(newPage);
      }}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize);
        setPage(1);
      }}
      exportFileName="question_labeling"
      onDeleteRow={(row) => {
        if (row.id !== undefined) {
          removeAppointment(row.id);
        }
      }}
    />
  );
}
