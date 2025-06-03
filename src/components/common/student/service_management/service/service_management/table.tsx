import { useMemo, useState } from "react";
import { useServiceTypesList } from "../../../../../hooks/serviceTypes/useList";
import { useNavigate } from "react-router-dom";
import { ServicetypesData } from "../../../../../../types/serviceTypes/list";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
export default function ServiceTypeTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const serviceTypeParams = {
    enabled: true,
  };

  const {
    servicetypesData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: updatePage,
    setPageSize: updatePageSize,
  } = useServiceTypesList(serviceTypeParams);

  const columns: ColumnDefinition<ServicetypesData>[] = useMemo(
    () => [
      {
        key: "service_name",
        label: "Hizmet Adı",
        render: (row: any) => (row.name ? String(row.name) : "-"),
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row: any, openDeleteModal: any) => {
          return (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigate(`/servicetype-crud/${row.id}`);
                }}
                className="btn btn-icon btn-sm btn-info-light rounded-pill"
              >
                <i className="ti ti-pencil" />
              </button>
              <button
                style={{ marginLeft: "10px" }}
                className="btn btn-icon btn-sm btn-danger-light rounded-pill"
                onClick={() => openDeleteModal && openDeleteModal(row)}
              >
                <i className="ti ti-trash" />
              </button>
            </div>
          );
        },
      },
    ],
    [navigate]
  );

  return (
    <ReusableTable<ServicetypesData>
      columns={columns}
      data={servicetypesData}
      loading={loading}
      error={error}
      showModal={true}
      tableMode="single"
      totalPages={totalPages}
      totalItems={totalItems}
      onAdd={() => navigate("/servicetype-crud")}
      onCloseModal={() => navigate(-1)}
      showExportButtons={true}
      exportFileName="servicetypes"
      pageSize={pageSize}
      currentPage={page}
      onPageChange={(newPage) => {
        setPage(newPage);
        updatePage(newPage);
      }}
      onPageSizeChange={(newPageSize) => {
        setPageSize(newPageSize);
        updatePageSize(newPageSize);
      }}
    />
  );
}
