import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateQueryParamsFromFilters } from "../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import { useCoursesTable } from "../../../../hooks/course/useList";
import { data } from "../../../../../types/courses/list";
import ReusableTable, {
  ColumnDefinition,
  useDebounce,
} from "../../../ReusableTable";
import { deleteCourse } from "../../../../../slices/courses/delete/thunk";

type QueryParams = {
  [x: string]: any;
  name: string;
  pageSize: number;
  page: number;
};

interface TrackTableProps {
  schoolClassId?: number;
  enabled?: boolean;
}

export default function TrackTable({ schoolClassId }: TrackTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [inputName, setInputName] = useState(""); // UI için
  const debouncedName = useDebounce<string>(inputName, 500);
  const [name, setName] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState({
    name: false,
  });
  const [enabled, setEnabled] = useState(false);
  const { state } = useLocation() as {
    state?: { school_class_id?: number; enabled?: boolean };
  };

  const currentSchoolClassId = schoolClassId || state?.school_class_id;

  useEffect(() => {
    if (currentSchoolClassId) {
      setEnabled(true);
    }
  }, [currentSchoolClassId]);

  const handleFilterChange = (key: string, value: any) => {
    setFiltersEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "name") setInputName(value);
  };

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName]);

  const filterState = useMemo(
    () => ({
      name: name,
      page: 1,
      pageSize,
    }),
    [name, pageSize]
  );
  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    if (params.name) query.set("course_name", params.name);

    navigate(`?${query.toString()}`);
  };
  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const trackParams = useMemo(
    () => ({
      enabled: enabled,
      paginate: pageSize,
      page: page,
      per_page: pageSize,
      level_id: currentSchoolClassId,
      name: name,
    }),
    [pageSize, page, name, currentSchoolClassId, enabled]
  );

  const {
    coursesData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: updatePage,
    setPageSize: updateTablePageSize,
  } = useCoursesTable(trackParams);

  const filters = useMemo(() => {
    return [
      {
        key: "name",
        value: inputName,
        placeholder: "Sınıf seviyesi...",
        type: "text" as const,
        onChange: (val: string) => {
          handleFilterChange("name", val);
        },
        isEnabled: filtersEnabled.name,
      },
    ];
  }, [inputName]);

  const columns: ColumnDefinition<data>[] = useMemo(
    () => [
      {
        key: "name",
        label: "Name",
        render: (row) => row.name,
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigate(`/educational-structure/track-crud/${row.id}`);
              }}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              onClick={() => openDeleteModal && openDeleteModal(row)}
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              style={{ marginLeft: "10px" }}
            >
              <i className="ti ti-trash" />
            </button>{" "}
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <>
      <ReusableTable<data>
        columns={columns}
        data={coursesData}
        loading={loading}
        error={error}
        showModal={false}
        tableMode="multi"
        currentPage={page}
        filters={filters}
        totalPages={totalPages}
        totalItems={totalItems}
        onAdd={() => {
          navigate("/educational-structure/track-crud/");
        }}
        onDeleteRow={(row) => {
          deleteCourse(row.id);
        }}
        onPageChange={(newPage) => {
          setPage(newPage);
          updatePage(newPage);
        }}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          updateTablePageSize(newSize);
          setPage(1);
          updatePage(1);
        }}
        exportFileName="school_types"
        showExportButtons={true}
      />
    </>
  );
}
