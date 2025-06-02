import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListCounties } from "../../../hooks/county/useCountyList";
import { County } from "../../../../types/counties/list";
import ReusableTable, { ColumnDefinition, useDebounce } from "../../ReusableTable";
import { deleteCounty } from "../../../../slices/counties/delete/thunk";

interface CountyTableProps {
  cityId?: number;
  enabled?: boolean;
  onSelectCounty?: (county: County) => void;
}

type QueryParams = { [x: string]: any; name: string; pageSize: number; page: number };

export default function CountyTable({ cityId, enabled, onSelectCounty }: CountyTableProps) {
  const navigate = useNavigate();
  const [page] = useState(1);
  const [pageSize] = useState<number>(10);
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

  const params = useMemo(
    () => ({
      enabled: enabled,
      page: page,
      pageSize: pageSize,
      name: name,
      city_id: cityId,
    }),
    [enabled, page, pageSize, name, cityId]
  );

  const { Countriesdata: countiesData, status, error } = useListCounties(params);
  const loading = status === "LOADING";

  const filters = useMemo(
    () => [
      {
        key: "name",
        value: inputName,
        placeholder: "İlçe...",
        type: "text" as const,
        onChange: (val: string) => handleFilterChange("name", val),
        isEnabled: filtersEnabled.name,
      },
    ],
    [inputName]
  );

  const columns: ColumnDefinition<County>[] = useMemo(
    () => [
      { key: "name", label: "Name", render: (row) => row.name },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/parameters/county-crud/${row.id}`)}
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
            {onSelectCounty && (
              <button
                onClick={() => onSelectCounty(row)}
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
    [navigate, onSelectCounty]
  );

  return (
    <ReusableTable<County>
      columns={columns}
      data={Array.isArray(countiesData) ? countiesData : []}
      loading={loading}
      error={error}
      tableMode="multi"
      currentPage={page}
      filters={filters}
      onAdd={() => navigate("/parameters/county-crud/", { state: { city_id: cityId } })}
      onDeleteRow={(row) => deleteCounty(row.id)}
      exportFileName="counties"
      showExportButtons={true}
    />
  );
}
