import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserDataField from "../../../../../utils/user_data_field";
import { useProgramsTable } from "../../../../hooks/program/useList";
import { useClassroomList } from "../../../../hooks/classrooms/useList";
import { useListStudents } from "../../../../hooks/student/useList";
import FilterGroup, {
  FilterDefinition,
} from "../../components/organisms/SearchFilter";
import { useScheduledAssignmentsTable } from "../../../../hooks/scheduledAssignments/useList";
import ReusableTable, { useDebounce } from "../../../ReusableTable";
import QuestionTime from "./table";
import { useUpdateQueryParamsFromFilters } from "../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";

type QueryParams = {
  [x: string]: any;
  program_id?: string;
  level_id?: string;
  student_id?: string;
};

interface QuestionTimeFilterProps {
  QuestionTimeChange: (data: { id: string; name: string }) => void;
}
const QuestionTimeFilter: React.FC<QuestionTimeFilterProps> = ({
  QuestionTimeChange,
}) => {
  const navigate = useNavigate();
  const [program_id, setProgramId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [inputName, setInputName] = useState(""); // UI için
  const debouncedName = useDebounce<string>(inputName, 500);
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
    first_name: debouncedName,
    page: 1,
    pageSize: 100,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("program_id")) setProgramId(params.get("program_id") || "");
    if (params.get("level_id")) setLevelId(params.get("level_id") || "");
    if (params.get("first_name")) setStudentId(params.get("first_name") || "");
  }, [location.search]);

  useEffect(() => {
    QuestionTimeChange({ id: studentId, name: inputName });
  }, [studentId, inputName, QuestionTimeChange]);

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
  };

  const filterState = useMemo(
    () => ({
      student_id: studentId,
    }),
    [studentId]
  );

  // URL parametrelerini güncelleme
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();

    query.set("student_id", String(params.student_id));

    query.set("paginate", String(paginate));
    navigate(`?${query.toString()}`);
  };

  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const filters: FilterDefinition[] = [
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
      label: "Öğrenciler",
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
  ];

  const {
    scheduledAssignmentsData,
    paginate,
    page,
    setPage,
    setPaginate,
    totalPages,
    totalItems,
  } = useScheduledAssignmentsTable({
    enabled: true,
    student_id: debouncedName,
  });
  // Pager options
  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (newSize: number) => {
    setPaginate(newSize);
  };

  return (
    <div>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={3} />
      <ReusableTable
        columns={QuestionTime}
        data={scheduledAssignmentsData}
        loading={false}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={paginate}
        tableMode="single"
        error={null}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        showExportButtons={true}
        exportFileName="parent_meetings"
      />
    </div>
  );
};

export default QuestionTimeFilter;
