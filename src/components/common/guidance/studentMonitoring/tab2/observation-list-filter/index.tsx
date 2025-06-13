import { useEffect, useMemo, useState } from "react";
import FilterGroup, {
  FilterDefinition,
} from "../../../components/organisms/SearchFilter.tsx";
import { useListStudents } from "../../../../../hooks/student/useList.tsx";
import { useNavigate } from "react-router-dom";
import { useProgramsTable } from "../../../../../hooks/program/useList.tsx";
import getUserDataField from "../../../../../../utils/user_data_field.tsx";
import { useClassroomList } from "../../../../../hooks/classrooms/useList.tsx";
import ReusableTable, { useDebounce } from "../../../../ReusableTable.tsx";
import { useGuidanceObservationsList } from "../../../../../hooks/guidanceObservations/useList.tsx";
import columnsObservation from "./table.tsx";
import { useUpdateQueryParamsFromFilters } from "../../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters.tsx";

type QueryParams = {
  [x: string]: any;
  program_id?: string;
  level_id?: string;
  student_id?: string;
  status?: string;
};

interface ObservationListFilterProps {
  onObservationChange: (data: { id: string; name: string }) => void;
}
const ObservationListFilter: React.FC<ObservationListFilterProps> = ({
  onObservationChange,
}) => {
  const navigate = useNavigate();
  const [program_id, setProgramId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("");
  const [inputName, setInputName] = useState("");
  const debouncedName = useDebounce<string>(inputName, 500);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filtersEnabled, setFilterEnabled] = useState({
    program_id: false,
    level_id: false,
    first_name: false,
  });

  const { default_branche } = getUserDataField();

  const levelParams = useMemo(
    () => ({
      enabled: program_id ? true : false,
      program_id: program_id,
      branch_id: default_branche,
    }),
    [program_id]
  );

  const { programsData: programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
  });
  const { classroomData: programLevelsData } = useClassroomList(levelParams);
  const { data: studentNameData } = useListStudents({
    enabled: level_id ? true : false,
    student_id: debouncedName,
    page: 1,
    pageSize: 100,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const studentIdParam = params.get("student_id");
    if (studentIdParam && studentIdParam !== "undefined") {
      setStudentId(studentIdParam);
    }
    const statusParam = params.get("status");
    if (statusParam) {
      setStatus(statusParam);
    }
    if (params.get("startDate")) setStartDate(params.get("startDate") || "");
    if (params.get("endDate")) setEndDate(params.get("endDate") || "");
  }, [location.search]);

  useEffect(() => {
    onObservationChange({ id: studentId, name: inputName });
  }, [studentId, inputName, onObservationChange]);

  const handleFilterChange = (key: string, value: string) => {
    setFilterEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "program_id") setProgramId(value);
    if (key === "level_id") setLevelId(value);
    if (key === "first_name") {
      setInputName(value);
    }
    if (key === "status") {
      setStatus(value);
    }
    if (key === "startDate") {
      setStartDate(value);
    }
    if (key === "endDate") {
      setEndDate(value);
    }
  };

  const filterState = useMemo(
    () => ({
      student_id: studentId,
      start_date: startDate,
      end_date: endDate,
      status: status,
    }),
    [studentId, status, startDate, endDate]
  );

  // URL parametrelerini güncelleme
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();

    query.set("student_id", String(params.student_id));
    query.set("start_date", String(params.start_date));
    query.set("end_date", String(params.end_date));

    if (params.status) {
      query.set("status", String(params.status));
    }

    query.set("paginate", String(paginate));
    navigate(`?${query.toString()}`);
  };

  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const filters: FilterDefinition[] = [
    {
      key: "filter1",
      label: "Tarih Aralığı",
      type: "doubledate",
      onChange: (val: any) => {
        setStartDate(val.startDate);
        setEndDate(val.endDate);
        handleFilterChange("startDate", val.startDate);
        handleFilterChange("endDate", val.endDate);
      },
      value: {
        startDate: startDate,
        endDate: endDate,
      },
    },
    {
      key: "program_id",
      label: "Sınıf Seviyesi",
      value: program_id,
      type: "select",
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
      label: "Sınıf/Şube",
      value: level_id,
      type: "select" as const,
      onChange: (val: string) => {
        handleFilterChange("level_id", val);
      },
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, level_id: true }));
      },
      options: (programLevelsData || []).map((item) => ({
        value: String(item.id),
        label: item.name,
      })),
    },
    {
      key: "filter3",
      label: "Öğrenci",
      type: "autocomplete",
      value: inputName,
      onChange: (val: any) => {
        setInputName(val);
        if (val) {
          const matchedStudent = studentNameData?.find(
            (item: any) => item.first_name.toLowerCase() === val.toLowerCase()
          );
          if (matchedStudent) {
            if (matchedStudent.id) {
              setStudentId(matchedStudent.id.toString());
              console.log("Öğrenci seçildi:", matchedStudent.id.toString());
            }
          }
        } else {
          setStudentId("");
        }
      },
      options:
        studentNameData?.map((student: any) => ({
          value: student.id?.toString() || "",
          label: student.first_name || "",
        })) || [],
    },
    {
      key: "status",
      label: "Bilgi Giriş Durumu",
      type: "select",
      value: status,
      onChange: (val: string) => {
        handleFilterChange("status", val);
      },
      options: [
        { value: "0", label: "Eksik" },
        { value: "1", label: "Tamamlandı" },
      ],
    },
  ];

  const {
    guidanceObservationsData,
    paginate,
    page,
    setPage,
    setPaginate,
    totalPages,
    totalItems,
    loading,
  } = useGuidanceObservationsList({
    enabled: true,
    student_id: debouncedName,
    status: status,
    start_date: startDate,
    end_date: endDate,
  });

  // Pager options
  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (newSize: number) => {
    setPaginate(newSize);
  };

  // JSX düzenlemesi
  return (
    <div>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={4} />
      <ReusableTable
        columns={columnsObservation().columnsObservation}
        data={guidanceObservationsData}
        currentPage={page}
        loading={loading}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={paginate}
        tableMode="single"
        error={null}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onAdd={() => {
          navigate(
            "/guidance/studentMonitoring/tab2/observation-list-filter/crud"
          );
        }}
        showExportButtons={true}
        exportFileName="observations"
      />
    </div>
  );
};

export default ObservationListFilter;
