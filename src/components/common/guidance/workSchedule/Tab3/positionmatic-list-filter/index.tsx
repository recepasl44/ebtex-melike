import { useEffect, useMemo, useState } from "react";
import FilterGroup, {
  FilterDefinition,
} from "../../../components/organisms/SearchFilter.tsx";
import { useListStudents } from "../../../../../hooks/student/useList.tsx";
import { useNavigate } from "react-router-dom";
import { useProgramsTable } from "../../../../../hooks/program/useList.tsx";
import getUserDataField from "../../../../../../utils/user_data_field.tsx";
import { useClassroomList } from "../../../../../hooks/classrooms/useList.tsx";
import { useDebounce } from "../../../../ReusableTable.tsx";
import { useUpdateQueryParamsFromFilters } from "../../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters.tsx";

type QueryParams = {
  [x: string]: any;
  program_id?: string;
  level_id?: string;
  student_id?: string;
};

interface PositionmatikFilterProps {
  PositionmatikChange: (data: { id: string; name: string }) => void;
}
const PositionmatikListFilter: React.FC<PositionmatikFilterProps> = ({
  PositionmatikChange,
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

  // Load stored filter selections on mount
  useEffect(() => {
    const stored = localStorage.getItem("positionmatikFilters");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.program_id) setProgramId(parsed.program_id);
        if (parsed.level_id) setLevelId(parsed.level_id);
        if (parsed.studentId) setStudentId(parsed.studentId);
        if (parsed.inputName) setInputName(parsed.inputName);
      } catch (err) {
        console.error("Failed to parse stored filters", err);
      }
    }
  }, []);

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
    if (params.get("student_id")) setStudentId(params.get("student_id") || "");
  }, [location.search]);

  useEffect(() => {
    PositionmatikChange({ id: studentId, name: inputName });
  }, [studentId, inputName, PositionmatikChange]);

  // Persist current filters so other assignments can reuse them
  useEffect(() => {
    const toStore = {
      program_id,
      level_id,
      studentId,
      inputName,
    };
    localStorage.setItem("positionmatikFilters", JSON.stringify(toStore));
  }, [program_id, level_id, studentId, inputName]);

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
      student_id: debouncedName,
    }),
    [debouncedName]
  );

  // URL parametrelerini güncelleme
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();

    query.set("student_id", String(params.student_id));
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
      key: "student_id",
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

  return (
    <div>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={3} />
    </div>
  );
};

export default PositionmatikListFilter;
