import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSchoolCategoriesList } from "../../../hooks/schoolcategories/useList";
import ReusableTable, {
  ColumnDefinition,
  useDebounce,
} from "../../ReusableTable";
import { SchoolCategoryData } from "../../../../types/schoolcategories/list";
import { Button } from "react-bootstrap";
import { deleteSchoolCategory } from "../../../../slices/schoolcategories/delete/thunk";
import { useUpdateQueryParamsFromFilters } from "../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import sec_buton from "../../../../../assets/images/media/sec-buton.svg";
import sec_hover from "../../../../../assets/images/media/sec-buton-hover.svg";

type QueryParams = {
  [x: string]: any;
  name: string;
  pageSize: number;
  page: number;
};

interface SchoolTypesProps {
  onSelectSchoolType?: (schoolType: SchoolCategoryData) => void;
}

export default function SchoolTypeTable({
  onSelectSchoolType,
}: SchoolTypesProps) {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState(""); // UI için
  const debouncedName = useDebounce<string>(inputName, 500);
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState({
    name: false,
  });

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
    if (params.name) query.set("type_name", params.name);
    query.set("pageSize", String(params.pageSize));
    navigate(`?${query.toString()}`);
  };
  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const typeParams = useMemo(
    () => ({
      enabled: true,
      paginate: pageSize,
      page: page,
      per_page: pageSize,
      name: name,
    }),
    [pageSize, page, name]
  );

  const {
    listData,
    loading,
    error,
    setPage: updatePage,
    setPageSize: updateTablePageSize,
    totalPages,
    totalItems,
  } = useSchoolCategoriesList(typeParams);

  // Filtre Tablosu
  const filters = useMemo(() => {
    return [
      {
        key: "name",
        value: inputName, // UI için state değerini gösteriyoruz
        placeholder: "Okul türleri...",
        type: "text" as const,
        onChange: (val: string) => {
          handleFilterChange("name", val);
        },
        isEnabled: filtersEnabled.name,
      },
    ];
  }, [inputName]); // Bağımlılığı da güncelliyoruz

  const columns: ColumnDefinition<SchoolCategoryData>[] = useMemo(
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
                navigate(`/educational-structure/schooltype-crud/${row.id}`);
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
                if (onSelectSchoolType) {
                  onSelectSchoolType(row);
                } else {
                  // Geriye dönük uyumluluk için navigate seçeneği kalıyor
                  navigate("/educational-structure", {
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
                onMouseEnter={(e) => (e.currentTarget.src = sec_hover)}
                onMouseLeave={(e) => (e.currentTarget.src = sec_buton)}
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
      <ReusableTable<SchoolCategoryData>
        columns={columns}
        data={listData}
        loading={loading}
        error={error}
        showModal={false}
        tableMode="multi"
        currentPage={page}
        filters={filters}
        totalPages={totalPages}
        totalItems={totalItems}
        onAdd={() => {
          navigate("/educational-structure/schooltype-crud/");
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
        onDeleteRow={(row) => {
          deleteSchoolCategory(row.id);
        }}
        exportFileName="school_types"
        showExportButtons={true}
      />
    </>
  );
}
