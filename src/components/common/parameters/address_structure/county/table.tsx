import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListCounties } from "../../../../hooks/county/useCountyList";
import ReusableTable, { ColumnDefinition, useDebounce } from "../../../ReusableTable";
import { County } from "../../../../../types/counties/list";
import { deleteCounty } from "../../../../../slices/counties/delete/thunk";
import { Button } from "react-bootstrap";
import sec_buton from "../../../../../assets/images/media/sec-buton.svg";

interface CountyTableProps {
  onSelectCounty?: (county: County) => void;
  cityId?: number;
  enabled?: boolean;
}

export default function CountyTable({ cityId, onSelectCounty, enabled }: CountyTableProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [inputName, setInputName] = useState("");
  const debouncedName = useDebounce<string>(inputName, 500);
  const [name, setName] = useState("");
  const [filtersEnabled, setFiltersEnabled] = useState({ name: false });

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName]);

  const countyParams = useMemo(
    () => ({
      enabled: enabled,
      page: page,
      pageSize,
      name: name,
      city_id: cityId,
    }),
    [enabled, page, pageSize, name, cityId]
  );

  const {
    Countriesdata,
    status,
    error,
    data,
  } = useListCounties(countyParams);

  const countyData: County[] = Array.isArray(Countriesdata)
    ? Countriesdata
    : Array.isArray(data)
      ? data
      : [];

  const filters = useMemo(() => {
    return [
      {
        key: "name",
        value: inputName,
        placeholder: "İlçe...",
        type: "text" as const,
        onChange: (val: string) => {
          setFiltersEnabled((prev) => ({ ...prev, name: true }));
          setInputName(val);
        },
        isEnabled: filtersEnabled.name,
      },
    ];
  }, [inputName]);

  const columns: ColumnDefinition<County>[] = useMemo(
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
                navigate(`/parameters/country/county-crud/${row.id}`);
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
                if (onSelectCounty) {
                  onSelectCounty(row);
                } else {
                  navigate("/parameters/country", {
                    state: { county_id: row.id, enabled: true },
                  });
                }
              }}
              variant=""
              size="sm"
            >
              <img
                src={sec_buton}
                alt="Seç"
                style={{ width: "28px", height: "28px" }}
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
    [navigate, onSelectCounty]
  );

  return (
    <>
      <ReusableTable<County>
        columns={columns}
        data={countyData}
        loading={status === "LOADING"}
        error={error}
        showModal={false}
        tableMode="multi"
        currentPage={page}
        filters={filters}
        onAdd={() => {
          if (enabled) {
            navigate("/parameters/country/county-crud/");
          }
        }}
        onDeleteRow={(row) => {
          deleteCounty(row.id);
        }}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        exportFileName="counties"
        showExportButtons={true}
      />
    </>
  );
}
