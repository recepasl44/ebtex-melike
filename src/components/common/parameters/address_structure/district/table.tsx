import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDiscrictTable } from "../../../../hooks/districts/useList";
import ReusableTable, { ColumnDefinition, useDebounce } from "../../../ReusableTable";
import { IDistrict } from "../../../../../types/districts/list";
import { deleteProgram } from "../../../../../slices/programs/delete/thunk";

interface DistrictTableProps {
  countyId?: number;
  enabled?: boolean;
}

export default function DistrictTable({ countyId, enabled }: DistrictTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [inputName, setInputName] = useState("");
  const debouncedName = useDebounce<string>(inputName, 500);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName]);

  const districtParams = useMemo(
    () => ({
      enabled: enabled,
      page: page,
      pageSize,
      name: name,
      county_id: countyId,
    }),
    [enabled, page, pageSize, name, countyId]
  );

  const { discrictData, loading, error } = useDiscrictTable(districtParams);

  const columns: ColumnDefinition<IDistrict>[] = useMemo(
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
                navigate(`${import.meta.env.BASE_URL}parameters/country/district-crud/${row.id}`);
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
          </div>
        ),
      },
    ],
    [navigate]
  );

  return (
    <>
      <ReusableTable<IDistrict>
        columns={columns}
        data={discrictData || []}
        loading={loading}
        error={error}
        showModal={false}
        tableMode="multi"
        currentPage={page}
        filters={[]}
        onAdd={() => {
          if (enabled) {
            navigate(`${import.meta.env.BASE_URL}parameters/country/district-crud/`);
          }
        }}
        onDeleteRow={(row) => {
          deleteProgram(row.id);
        }}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        exportFileName="districts"
        showExportButtons={true}
      />
    </>
  );
}
