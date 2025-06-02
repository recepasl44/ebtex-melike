import { useEffect, useMemo, useState } from "react";
import getUserDataField from "../../../../../../../utils/user_data_field";
import { useNavigate } from "react-router-dom";
import { useProgramsTable } from "../../../../../../hooks/program/useList";
import { useClassroomList } from "../../../../../../hooks/classrooms/useList";
import { useListStudents } from "../../../../../../hooks/student/useList";
import { useScheduledAssignmentsTable } from "../../../../../../hooks/scheduledAssignments/useList";
import ReusableTable, { useDebounce } from "../../../../../ReusableTable";
import FilterGroup, {
  FilterDefinition,
} from "../../../../components/organisms/SearchFilter";
import { useUpdateQueryParamsFromFilters } from "../../../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import periodHomework from "./table";
import { useScheduledAssignmentDelete } from "../../../../../../hooks/scheduledAssignments/useDelete";
import { usePeriodsTable } from "../../../../../../hooks/periods/useList";
import { useLocation } from "react-router-dom";

type QueryParams = {
  [x: string]: any;
  program_id?: string;
  level_id?: string;
  student_id?: string;
};

interface HomeworkListFilterFilterProps {
  HomeworkListChange: (data: { id: string; name: string }) => void;
}
const HomeworkListFilter: React.FC<HomeworkListFilterFilterProps> = ({
  HomeworkListChange,
}) => {
  const navigate = useNavigate();
  const { deleteExistingScheduledAssignment } = useScheduledAssignmentDelete();
  const [program_id, setProgramId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [period_id, setPeriodId] = useState("");
  const debouncedName = useDebounce<string>(studentId, 500);
  const location = useLocation();
  const [filtersEnabled, setFilterEnabled] = useState({
    program_id: false,
    level_id: false,
    first_name: false,
    teacher_id: false,
  });
  const { default_branche, me } = getUserDataField();

  const { programsData: programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
    program_id,
  });
  const levelParams = useMemo(
    () => ({
      enabled: program_id ? true : false,
      program_id: program_id,
      level_id,
      branch_id: default_branche,
    }),
    [program_id, level_id]
  );

  const { classroomData: programLevelsData } = useClassroomList(levelParams);
  const { data: studentNameData } = useListStudents({
    enabled: level_id ? true : false,
    student_id: debouncedName,
    page: 1,
    pageSize: 100,
  });

  const { periodsData } = usePeriodsTable({
    enabled: !!debouncedName && filtersEnabled.teacher_id,
    page: 1,
    paginate: 100,
    student_id: debouncedName,
    teacher_id: me?.value,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("program_id")) setProgramId(params.get("program_id") || "");
    if (params.get("level_id")) setLevelId(params.get("level_id") || "");
    const studentIdParam = params.get("student_id");
    if (studentIdParam && studentIdParam !== "undefined") {
      setStudentId(studentIdParam);
    }
    if (params.get("teacher_id")) {
      setPeriodId(params.get("teacher_id") || "");
    }
  }, [location.search]);

  useEffect(() => {
    HomeworkListChange({ id: studentId, name: studentId });
  }, [studentId, studentId, HomeworkListChange]);

  const handleFilterChange = (key: string, value: string) => {
    setFilterEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "program_id") setProgramId(value);
    if (key === "level_id") setLevelId(value);
    if (key === "student_id") {
      setStudentId(value);
    }
    if (key === "teacher_id") {
      setPeriodId(value);
    }
  };

  // Öğrenci seçildiğinde period filtresini sıfırla
  useEffect(() => {
    if (studentId) {
      // Öğrenci değiştiğinde teacher_id'yi sıfırla
      setPeriodId("");
    }
  }, [studentId]);

  const filterState = useMemo(
    () => ({
      student_id: studentId,
      period_id: period_id, // Periyot ID'yi ekle
    }),
    [studentId, period_id]
  );

  // URL parametrelerini güncelleme
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();

    // Öğrenci ID'si varsa URL'ye ekle
    if (params.student_id) {
      query.set("student_id", String(params.student_id));
    }
    if (params.teacher_id) {
      query.set("teacher_id", String(params.teacher_id));
    }

    // Program ID ve Level ID'yi de ekleyin
    if (program_id) query.set("program_id", program_id);
    if (level_id) query.set("level_id", level_id);

    // Sayfalama parametresi
    if (paginate) {
      query.set("paginate", String(paginate));
    }

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
      value: studentId,
      onChange: (val: any) => {
        setStudentId(val);
        if (val) {
          // Tam bir öğrenci seçimi kontrolü
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
      onFocus: () => {
        setFilterEnabled((prev) => ({ ...prev, first_name: true }));
      },
      options:
        studentNameData?.map((student: any) => ({
          value: student.id?.toString() || "",
          label: student.first_name || "",
        })) || [],
    },
    {
      key: "period_id",
      label: "Periyot No",
      value: period_id,
      type: "select",
      options: (periodsData || []).map((item) => ({
        value: String(item.id),
        label: item.name,
      })),
      onChange: (val: string) => {
        handleFilterChange("teacher_id", val);
      },
      onClick: () => {
        if (debouncedName) {
          setFilterEnabled((prev) => ({ ...prev, teacher_id: true }));
        }
      },
    },
  ];

  const {
    scheduledAssignmentsData,
    paginate,
    page,
    setPage,
    totalPages,
    totalItems,
  } = useScheduledAssignmentsTable({
    enabled: !!debouncedName,
    student_id: debouncedName,
    period_id: period_id,
  });
  localStorage.setItem("selected_student_id", studentId);
  // Pager options
  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const tableColumns = periodHomework({
    navigate,
    deleteExistingScheduledAssignment,
  }).periodHomework;

  return (
    <div>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={4} />

      {debouncedName ? (
        <ReusableTable
          columns={tableColumns}
          data={scheduledAssignmentsData}
          loading={false}
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={paginate}
          tableMode="single"
          error={null}
          onAdd={() =>
            navigate(
              "/guidance/work-schedule/Tab1/TabChild1/homework-process-list-filter/date_crud"
            )
          }
          onPageChange={onPageChange}
          onDeleteRow={() => {}}
          showExportButtons={true}
          exportFileName="parent_meetings"
        />
      ) : (
        <div className="alert alert-info mt-3">
          Lütfen ödev süresini görmek için bir öğrenci seçiniz.
        </div>
      )}
    </div>
  );
};

export default HomeworkListFilter;
