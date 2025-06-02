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
import { useGuardianMeetingList } from "../../../../../hooks/guardianMeeting/useList";
import columnsParentMeeting from "./table";
import { useUpdateQueryParamsFromFilters } from "../../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters.tsx";
import { useGuardiansTable } from "../../../../../hooks/guardian/useList.tsx";

type QueryParams = {
  [x: string]: any;
  program_id?: string;
  level_id?: string;
  student_id?: string;
  status?: string;
};

interface ParentMeetingListFilterProps {
  parentMeetingChange: (data: { id: string; name: string }) => void;
}
const ParentMeetingListFilter: React.FC<ParentMeetingListFilterProps> = ({
  parentMeetingChange,
}) => {
  const navigate = useNavigate();
  const [program_id, setProgramId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [studentId, setStudentId] = useState("");
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
    first_name: debouncedName,
    page: 1,
    pageSize: 100,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("program_id")) setProgramId(params.get("program_id") || "");
    if (params.get("level_id")) setLevelId(params.get("level_id") || "");
    if (params.get("first_name")) setStudentId(params.get("first_name") || "");
    if (params.get("student_id")) setInputName(params.get("student_id") || "");
    if (params.get("startDate")) setStartDate(params.get("startDate") || "");
    if (params.get("endDate")) setEndDate(params.get("endDate") || "");
  }, [location.search]);

  useEffect(() => {
    parentMeetingChange({ id: studentId, name: inputName });
  }, [studentId, inputName, parentMeetingChange]);

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
    if (key === "startDate") {
      setStartDate(value);
    }
    if (key === "endDate") {
      setEndDate(value);
    }
  };

  // Anahtar ismi düzeltildi: studentId -> student_id
  const filterState = useMemo(
    () => ({
      student_id: studentId,
      start_date: startDate,
      end_date: endDate,
    }),
    [studentId, startDate, endDate]
  );

  // URL parametrelerini güncelleme
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();

    query.set("student_id", String(params.student_id));
    query.set("start_date", String(params.start_date));
    query.set("end_date", String(params.end_date));

    query.set("paginate", String(paginate));
    navigate(`?${query.toString()}`);
  };

  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const { guardiansData } = useGuardiansTable({
    enabled: filtersEnabled.level_id,
    page: 1,
    pageSize: 100,
  });

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
      label: "Sınıf",
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
      key: "first_name",
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
    // düzenlenecek
    {
      key: "full_name",
      label: "Veli Adı",
      type: "select",
      options: guardiansData.map((guardian) => ({
        label: `${guardian.full_name}`,
        value: guardian.id?.toString() || "",
      })),
    },
    {
      key: "meeting_type",
      label: "Görüşme Türü",
      type: "select",
      options: [
        { label: "Öğrenci Görüşmesi", value: "student" },
        { label: "Veli Görüşmesi", value: "guardian" },
        { label: "Öğretmen Görüşmesi", value: "teacher" },
      ],
    },
  ];

  const {
    guardianMeetingsData,
    paginate,
    page,
    setPage,
    setPaginate,
    totalPages,
    totalItems,
    loading,
  } = useGuardianMeetingList({
    enabled: true,
    student_id: debouncedName,
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

  return (
    <div>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={4} />
      <ReusableTable
        columns={columnsParentMeeting().columnsParentMeeting}
        data={guardianMeetingsData}
        loading={loading}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={paginate}
        tableMode="single"
        error={null}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onAdd={() => {
          navigate(
            `/guidance/studentMonitoring/tab4/parent-meetingList-filter/crud`
          );
        }}
        showExportButtons={true}
        exportFileName="parent_meetings"
      />
    </div>
  );
};

export default ParentMeetingListFilter;
