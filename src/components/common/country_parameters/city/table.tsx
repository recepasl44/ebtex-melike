import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCityTable } from "../../../hooks/city/useList";
import { City } from "../../../../types/city/list";
import ReusableTable, { ColumnDefinition, useDebounce } from "../../ReusableTable";
import { deleteCity } from "../../../../slices/cities/delete/thunk";
import { useUpdateQueryParamsFromFilters } from "../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";

interface CityTableProps {
  countryId?: number;
  enabled?: boolean;
  onSelectCity?: (city: City) => void;
}

type QueryParams = { [x: string]: any; name: string; pageSize: number; page: number };

export default function CityTable({ countryId, enabled, onSelectCity }: CityTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [inputName, setInputName] = useState("");
  const debouncedName = useDebounce<string>(inputName, 500);
  const [name, setName] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState({ name: false });

  const handleFilterChange = (key: string, value: any) => {
    setFiltersEnabled((prev) => ({ ...prev, [key]: true }));
    if (key === "name") setInputName(value);
  };

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName]);

  const filterState = useMemo(
    () => ({ name: name, page: 1, pageSize }),
    [name, pageSize]
  );

  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    if (params.name) query.set("city_name", params.name);
    navigate(`?${query.toString()}`);
  };
  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const params = useMemo(
    () => ({
      enabled: enabled,
      paginate: pageSize,
      page: page,
      per_page: pageSize,
      name: name,
      country_id: countryId,
    }),
    [pageSize, page, name, countryId, enabled]
  );

  const {
    cityData,
    loading,
    error,
    setPage: updatePage,
    setPageSize: updatePageSize,
    data,
  } = useCityTable(params);

  const filters = useMemo(
    () => [
      {
        key: "name",
        value: inputName,
        placeholder: "Şehir...",
        type: "text" as const,
        onChange: (val: string) => handleFilterChange("name", val),
        isEnabled: filtersEnabled.name,
      },
    ],
    [inputName]
  );

  const columns: ColumnDefinition<City>[] = useMemo(
    () => [
      { key: "name", label: "Name", render: (row) => row.name },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/parameters/city-crud/${row.id}`)}
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
            {onSelectCity && (
              <button
                onClick={() => onSelectCity(row)}
                className="btn btn-icon btn-sm btn-primary-light rounded-pill"
                style={{ marginLeft: "10px" }}
              >
                <i className="ti ti-check" />
              </button>
            )}
          </div>
        ),
      },
    ],
    [navigate, onSelectCity]
  );

  return (
    <ReusableTable<City>
      columns={columns}
      data={cityData}
      loading={loading}
      error={error}
      tableMode="multi"
      currentPage={page}
      filters={filters}
      onAdd={() => navigate("/parameters/city-crud/", { state: { country_id: countryId } })}
      onDeleteRow={(row) => deleteCity(row.id)}
      onPageChange={(newPage) => {
        setPage(newPage);
        updatePage(newPage);
      }}
      onPageSizeChange={(newSize) => {
        setPageSize(newSize);
        updatePageSize(newSize);
        setPage(1);
        updatePage(1);
      }}
      exportFileName="cities"
      showExportButtons={true}
    />
  );
}
