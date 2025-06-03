import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCityTable } from "../../../hooks/city/useList";
import ReusableTable, { ColumnDefinition, useDebounce } from "../../ReusableTable";
import { City } from "../../../types/city/list";
import { deleteCity } from "../../../slices/cities/delete/thunk";
import { Button } from "react-bootstrap";
import sec_buton from "../../../assets/images/media/sec-buton.svg";

interface CityTableProps {
  onSelectCity?: (city: City) => void;
  countryId?: number;
  enabled?: boolean;
}

export default function CityTable({ countryId, onSelectCity, enabled }: CityTableProps) {
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

  const cityParams = useMemo(
    () => ({
      enabled: enabled,
      page: page,
      pageSize,
      name: name,
      country_id: countryId,
    }),
    [enabled, page, pageSize, name, countryId]
  );

  const {
    cityData,
    loading,
    error,
    setPage: updatePage,
    setPageSize: updatePageSize,
  } = useCityTable(cityParams);

  const filters = useMemo(() => {
    return [
      {
        key: "name",
        value: inputName,
        placeholder: "Şehir...",
        type: "text" as const,
        onChange: (val: string) => {
          setFiltersEnabled((prev) => ({ ...prev, name: true }));
          setInputName(val);
        },
        isEnabled: filtersEnabled.name,
      },
    ];
  }, [inputName]);

  const columns: ColumnDefinition<City>[] = useMemo(
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
                navigate(`/parameters/country/city-crud/${row.id}`);
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
                if (onSelectCity) {
                  onSelectCity(row);
                } else {
                  navigate("/parameters/country", {
                    state: { city_id: row.id, enabled: true },
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
    [navigate, onSelectCity]
  );

  return (
    <>
      <ReusableTable<City>
        columns={columns}
        data={cityData}
        loading={loading}
        error={error}
        showModal={false}
        tableMode="multi"
        currentPage={page}
        filters={filters}
        onAdd={() => {
          if (enabled) {
            navigate("/parameters/country/city-crud/");
          }
        }}
        onDeleteRow={(row) => {
          deleteCity(row.id);
        }}
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
    </>
  );
}
