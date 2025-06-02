import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDiscrictTable } from "../../../hooks/districts/useList";
import { IDistrict } from "../../../../types/districts/list";
import ReusableTable, { ColumnDefinition, useDebounce } from "../../ReusableTable";
import { deleteDistrict } from "../../../../slices/districts/delete/thunk";

interface DistrictTableProps {
  countyId?: number;
  enabled?: boolean;
}

type QueryParams = { [x: string]: any; name: string; pageSize: number; page: number };

export default function DistrictTable({ countyId, enabled }: DistrictTableProps) {
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
      county_id: countyId,
    }),
    [enabled, page, pageSize, name, countyId]
  );

  const { discrictData: districtData, status, error } = useDiscrictTable(params);
  const loading = status === "LOADING";

  const filters = useMemo(
    () => [
      {
        key: "name",
        value: inputName,
        placeholder: "Mahalle...",
        type: "text" as const,
        onChange: (val: string) => handleFilterChange("name", val),
        isEnabled: filtersEnabled.name,
      },
    ],
    [inputName]
  );

  const columns: ColumnDefinition<IDistrict>[] = useMemo(
    () => [
      { key: "name", label: "Name", render: (row) => row.name },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/parameters/district-crud/${row.id}`)}
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
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <ReusableTable<IDistrict>
      columns={columns}
      data={Array.isArray(districtData) ? districtData : []}
      loading={loading}
      error={error}
      tableMode="multi"
      currentPage={page}
      filters={filters}
      onAdd={() => navigate("/parameters/district-crud/", { state: { county_id: countyId } })}
      onDeleteRow={(row) => deleteDistrict(row.id)}
      exportFileName="districts"
      showExportButtons={true}
    />
  );
}
