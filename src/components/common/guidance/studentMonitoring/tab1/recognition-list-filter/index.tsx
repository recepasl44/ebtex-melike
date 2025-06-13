import { useEffect, useMemo, useState } from "react";
import FilterGroup, {
  FilterDefinition,
} from "../../../components/organisms/SearchFilter.tsx";
import { useListStudents } from "../../../../../hooks/student/useList.tsx";
import { useLevelsTable } from "../../../../../hooks/levels/useList.tsx";
import { useNavigate } from "react-router-dom";
import { useProgramsTable } from "../../../../../hooks/program/useList.tsx";
import { useDebounce } from "../../../../ReusableTable.tsx";

interface RecognitionFormFilterProps {
  onStudentIdChange: (data: { id: string; name: string }) => void;
}

const RecognitionFormFilter: React.FC<RecognitionFormFilterProps> = ({
  onStudentIdChange,
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

  useEffect(() => {
    setInputName(debouncedName);
  }, [debouncedName]);

  const levelParams = useMemo(
    () => ({
      enabled: program_id ? true : false,
      program_id: program_id,
    }),
    [program_id]
  );

  const { data: studentNameData } = useListStudents({
    enabled: level_id ? true : false,
    first_name: inputName,
    page: 1,
    pageSize: 100,
  });
  const { levelsData: programLevelsData } = useLevelsTable(levelParams);
  const { programsData: programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("program_id")) setProgramId(params.get("program_id") || "");
    if (params.get("level_id")) setLevelId(params.get("level_id") || "");
    if (params.get("first_name")) setStudentId(params.get("first_name") || "");
  }, [location.search]);

  useEffect(() => {
    onStudentIdChange({ id: studentId, name: inputName });
  }, [studentId, inputName, onStudentIdChange]);

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

export default RecognitionFormFilter;
