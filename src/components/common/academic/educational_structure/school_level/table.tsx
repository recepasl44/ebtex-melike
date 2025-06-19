import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateQueryParamsFromFilters } from "../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import { useProgramsTable } from "../../../../hooks/program/useList";
import { Button } from "react-bootstrap";
import ReusableTable, {
  ColumnDefinition,
  useDebounce,
} from "../../../ReusableTable";
import { Program } from "../../../../../types/programs/list";
import { deleteProgram } from "../../../../../slices/programs/delete/thunk";
import sec_buton from "../../../../../assets/images/media/sec-buton.svg";

type QueryParams = {
  [x: string]: any;
  name: string;
  pageSize: number;
  page: number;
};

interface SchoolLevelTableProps {
  onSelectSchoolLevel?: (schoolLevel: Program) => void;
  schoolTypeId?: number;
  enabled?: boolean;
}

export default function SchoolLevelTable({
  schoolTypeId,
  onSelectSchoolLevel,
}: SchoolLevelTableProps) {
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
    state?: { school_type_id?: number; enabled?: boolean };
  };

  const currentSchoolTypeId = schoolTypeId || state?.school_type_id;

  useEffect(() => {
    if (currentSchoolTypeId) {
      setEnabled(true);
      setName(debouncedName);
    }
  }, [currentSchoolTypeId, debouncedName]);

  const handleFilterChange = (key: string, value: any) => {
    setFiltersEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "name") {
      setInputName(value); // UI için state'i güncelle
      // name state'i (API çağrısı için) debounce mekanizması tarafından güncellenecek
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("name")) setName(params.get("name") || "");
  }, [location.search]);

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
    if (params.name) query.set("program_name", params.name);

    navigate(`?${query.toString()}`);
  };
  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const schoolParams = useMemo(
    () => ({
      enabled: enabled,
      paginate: pageSize,
      page: page,
      per_page: pageSize,
      name: name,
      category_id: currentSchoolTypeId,
    }),
    [pageSize, page, name, enabled, currentSchoolTypeId]
  );

  const {
    programsData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: updatePage,
    setPageSize: updateTablePageSize,
  } = useProgramsTable(schoolParams);

  // Filtre Tablosu
  const filters = useMemo(() => {
    return [
      {
        key: "name",
        value: inputName, // UI için state değerini gösteriyoruz
        placeholder: "Okul seviyesi...",
        type: "text" as const,
        onChange: (val: string) => {
          handleFilterChange("name", val);
        },
        isEnabled: filtersEnabled.name,
      },
    ];
  }, [inputName]); // Bağımlılığı da güncelliyoruz

  const columns: ColumnDefinition<Program>[] = useMemo(
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
                navigate(`/educational-structure/level-crud/${row.id}`);
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
                if (onSelectSchoolLevel) {
                  onSelectSchoolLevel(row);
                } else {
                  // Geriye dönük uyumluluk için navigate seçeneği kalıyor
                  navigate("/service-management", {
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
      <ReusableTable<Program>
        columns={columns}
        data={programsData}
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
            navigate("/educational-structure/level-crud");
          }
        }}
        onDeleteRow={(row) => {
          deleteProgram(row.id);
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
