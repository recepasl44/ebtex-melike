import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateQueryParamsFromFilters } from "../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import { useLevelsTable } from "../../../../hooks/levels/useList";
import ReusableTable, {
  ColumnDefinition,
  useDebounce,
} from "../../../ReusableTable";
import { LevelData } from "../../../../../types/levels/list";
import { Button } from "react-bootstrap";
import { deleteLevel } from "../../../../../slices/levels/delete/thunk";
import sec_buton from "../../../../../assets/images/media/sec-buton.svg";

type QueryParams = {
  [x: string]: any;
  name: string;
  pageSize: number;
  page: number;
};

interface ClassLevelTableProps {
  onSelectClassLevel?: (classLevel: LevelData) => void;
  schoolLevelId?: number;
  enabled?: boolean;
}

export default function ClassLevelTable({
  schoolLevelId,
  onSelectClassLevel,
}: ClassLevelTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState(""); // UI için
  const debouncedName = useDebounce<string>(inputName, 500);
  const [filtersEnabled, setFiltersEnabled] = useState({
    name: false,
  });
  const [enabled, setEnabled] = useState(false);
  const { state } = useLocation() as {
    state?: { school_level_id?: number; enabled?: boolean };
  };

  const currentSchoolLevelId = schoolLevelId || state?.school_level_id;

  useEffect(() => {
    if (currentSchoolLevelId) {
      setEnabled(true);
    }
  }, [currentSchoolLevelId]);

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
    if (params.name) query.set("class_name", params.name);

    navigate(`?${query.toString()}`);
  };
  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const classParams = useMemo(
    () => ({
      enabled: enabled,
      paginate: pageSize,
      page: page,
      per_page: pageSize,
      name: name,
      program_id: currentSchoolLevelId,
    }),
    [pageSize, page, name, enabled, currentSchoolLevelId]
  );

  const {
    levelsData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: updatePage,
    setPageSize: updateTablePageSize,
  } = useLevelsTable(classParams);

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

  const columns: ColumnDefinition<LevelData>[] = useMemo(
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
                navigate(`/educational-structure/classlevel-crud/${row.id}`);
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
            </button>
            <Button
              onClick={() => {
                if (onSelectClassLevel) {
                  onSelectClassLevel(row);
                } else {
                  // Geriye dönük uyumluluk için navigate seçeneği kalıyor
                  navigate("/educational-structure/classlevel-crud/", {
                    state: {
                      service_id: row.id,
                      enabled: true,
                    },
                  });
                }
              }}
              variant=""
              size="sm"
            >
              <img
                src={sec_buton}
                alt="Seç"
                style={{
                  width: "28px",
                  height: "28px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.src =
                    "/src/assets/images/media/sec-buton-hover.svg")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.src =
                    "/src/assets/images/media/sec-buton.svg")
                }
              />
            </Button>{" "}
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <>
      <ReusableTable<LevelData>
        columns={columns}
        data={levelsData}
        loading={loading}
        error={error}
        showModal={false}
        tableMode="multi"
        currentPage={page}
        filters={filters}
        totalPages={totalPages}
        totalItems={totalItems}
        onAdd={() => {
          if (enabled == true) {
            navigate("/educational-structure/classlevel-crud");
          }
        }}
        onDeleteRow={(row) => {
          deleteLevel(row.id);
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
