import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountriesList } from "../../../hooks/countries/useCountriesList";
import { ICountry } from "../../../../types/countries/list";
import ReusableTable, { ColumnDefinition, useDebounce } from "../../ReusableTable";
import { deleteCountry } from "../../../../slices/countries/delete/thunk";
import { useUpdateQueryParamsFromFilters } from "../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";

interface CountryTableProps {
  onSelectCountry?: (country: ICountry) => void;
}

type QueryParams = {
  [x: string]: any;
  name: string;
  pageSize: number;
  page: number;
};

export default function CountryTable({ onSelectCountry }: CountryTableProps) {
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
    if (params.name) query.set("country_name", params.name);
    navigate(`?${query.toString()}`);
  };
  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const params = useMemo(
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
    countriesData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: updatePage,
    setPageSize: updateTablePageSize,
  } = useCountriesList(params);

  const filters = useMemo(
    () => [
      {
        key: "name",
        value: inputName,
        placeholder: "Ülke...",
        type: "text" as const,
        onChange: (val: string) => {
          handleFilterChange("name", val);
        },
        isEnabled: filtersEnabled.name,
      },
    ],
    [inputName]
  );

  const columns: ColumnDefinition<ICountry>[] = useMemo(
    () => [
      { key: "name", label: "Name", render: (row) => row.name },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigate(`/parameters/country-crud/${row.id}`);
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
            {onSelectCountry && (
              <button
                onClick={() => onSelectCountry(row)}
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
    [navigate, onSelectCountry]
  );

  return (
    <>
      <ReusableTable<ICountry>
        columns={columns}
        data={countriesData}
        loading={loading}
        error={error}
        showModal={false}
        tableMode="multi"
        currentPage={page}
        filters={filters}
        totalPages={totalPages}
        totalItems={totalItems}
        onAdd={() => {
          navigate("/parameters/country-crud/", { state: {} });
        }}
        onDeleteRow={(row) => {
          deleteCountry(row.id);
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
        exportFileName="countries"
        showExportButtons={true}
      />
    </>
  );
}
