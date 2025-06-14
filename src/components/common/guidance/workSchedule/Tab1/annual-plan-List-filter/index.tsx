import { useEffect, useMemo, useState } from "react";
import FilterGroup, {
  FilterDefinition,
} from "../../../components/organisms/SearchFilter.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProgramsTable } from "../../../../../hooks/program/useList.tsx";
import getUserDataField from "../../../../../../utils/user_data_field.tsx";
import { useClassroomList } from "../../../../../hooks/classrooms/useList.tsx";
import ReusableTable from "../../../../ReusableTable.tsx";
import { useScheduledAssignmentsTable } from "../../../../../hooks/scheduledAssignments/useList.tsx";
import annualPlan from "./table.tsx";
import { useUpdateQueryParamsFromFilters } from "../../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters.tsx";
import { useLessonList } from "../../../../../hooks/lessons/useList.tsx";
import { useUnitsTable } from "../../../../../hooks/units/useList.tsx";
import { useScheduledAssignmentDelete } from "../../../../../hooks/scheduledAssignments/useDelete.tsx";

type QueryParams = {
  [x: string]: any;
  program_id?: string;
  level_id?: string;
  unit_id?: string;
  status?: string;
};

interface AnnualPlanListFilterProps {
  annualPlanChange: (data: { id: string; name: string }) => void;
}
const AnnualPlanListFilter: React.FC<AnnualPlanListFilterProps> = () => {
  const navigate = useNavigate();
  const [program_id, setProgramId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [lesson_id, setLessonId] = useState("");
  const [unit_id, setUnitId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [filtersEnabled, setFilterEnabled] = useState({
    program_id: false,
    level_id: false,
    unit_id: false,
  });
  // URL'den delete_id'yi al
  const [searchParams] = useSearchParams();
  const deleteId = searchParams.get("delete_id");

  const { deleteExistingScheduledAssignment } = useScheduledAssignmentDelete();
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

  const { lessonsData } = useLessonList({
    enabled: !!level_id,
    level_id: level_id,
  });

  const { unitsData } = useUnitsTable({
    enabled: !!lesson_id,
    lesson_id: lesson_id,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("program_id")) setProgramId(params.get("program_id") || "");
    if (params.get("level_id")) setLevelId(params.get("level_id") || "");
    if (params.get("lesson_id")) setLessonId(params.get("lesson_id") || "");
    if (params.get("unit_id")) setUnitId(params.get("unit_id") || "");
    if (params.get("startDate")) setStartDate(params.get("startDate") || "");
    if (params.get("endDate")) setEndDate(params.get("endDate") || "");
  }, [location.search]);

  const handleFilterChange = (key: string, value: string) => {
    setFilterEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "program_id") setProgramId(value);
    if (key === "level_id") setLevelId(value);
    if (key === "lesson_id") setLessonId(value);
    if (key === "unit_id") setUnitId(value);
    if (key === "startDate") {
      setStartDate(value);
    }
    if (key === "endDate") {
      setEndDate(value);
    }
    if (key === "status") {
      setStatus(value);
    }
  };

  const filterState = useMemo(
    () => ({
      program_id,
      level_id,
      lesson_id,
      unit_id,
      start_date: startDate,
      end_date: endDate,
      status: status,
    }),
    [unit_id, startDate, endDate, program_id, level_id, lesson_id, status]
  );

  // URL parametrelerini güncelleme
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();

    if (params.unit_id) {
      query.set("unit_id", String(params.unit_id));
    }
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
      options: (programLevelsData || []).map((item: any) => ({
        value: String(item.id),
        label: item.name,
      })),
    },
    {
      key: "lesson",
      label: "Ders",
      value: lesson_id,
      type: "select",
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, lesson_id: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("lesson_id", val);
      },
      options: (lessonsData || []).map((item) => ({
        value: String(item.id),
        label: item.name,
      })),
    },
    {
      key: "subject",
      label: "Ünite/Konu",
      value: unit_id,
      type: "select",
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, unit_id: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("unit_id", val);
      },
      options: (unitsData || []).map((item) => ({
        value: String(item.id),
        label: item.name,
      })),
    },
    {
      key: "status",
      label: "Durum",
      value: status,
      type: "select",
      onChange: (val: string) => {
        handleFilterChange("status", val);
      },
      options: [
        { value: "1", label: "Aktif" },
        { value: "0", label: "Verildi" },
        { value: "3", label: "Eksik" },
        { value: "2", label: "Verilmedi" },
      ],
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
    loading,
  } = useScheduledAssignmentsTable({
    enabled: true,
    type_id: 1,
    unit_id: unit_id,
    start_date: startDate,
    end_date: endDate,
    status: status,
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
        columns={annualPlan().annualPlan}
        data={scheduledAssignmentsData}
        loading={loading}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={paginate}
        tableMode="single"
        error={null}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onAdd={() => navigate("/guidance/work-schedule/annual-plan-crud")}
        showExportButtons={true}
        exportFileName="parent_meetings"
        onDeleteRow={() => {
          deleteExistingScheduledAssignment(Number(deleteId));
        }}
      />
    </div>
  );
};

export default AnnualPlanListFilter;
