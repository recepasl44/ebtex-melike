import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountriesList } from "../../../../hooks/countries/useCountriesList";
import ReusableTable, { ColumnDefinition, useDebounce } from "../../../ReusableTable";
import { ICountry } from "../../../../../types/countries/list";
import { deleteCountry } from "../../../../../slices/countries/delete/thunk";
import { Button } from "react-bootstrap";
import sec_buton from "../../../../../assets/images/media/sec-buton.svg";

interface CountryTableProps {
  onSelectCountry?: (country: ICountry) => void;
}

export default function CountryTable({ onSelectCountry }: CountryTableProps) {
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


  const countryParams = useMemo(
    () => ({
      enabled: true,
      page: page,
      pageSize,
      name: name,
    }),
    [page, pageSize, name]
  );

  const {
    countriesData,
    loading,
    error,
    setPage: updatePage,
    setPageSize: updatePageSize,
    totalPages,
    totalItems,
  } = useCountriesList(countryParams);

  const filters = useMemo(() => {
    return [
      {
        key: "name",
        value: inputName,
        placeholder: "Ülke...",
        type: "text" as const,
        onChange: (val: string) => {
          setFiltersEnabled((prev) => ({ ...prev, name: true }));
          setInputName(val);
        },
        isEnabled: filtersEnabled.name,
      },
    ];
  }, [inputName]);

  const columns: ColumnDefinition<ICountry>[] = useMemo(
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
                navigate(`${import.meta.env.BASE_URL}parameters/country/country-crud/${row.id}`);
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
                if (onSelectCountry) {
                  onSelectCountry(row);
                } else {
                  navigate(`${import.meta.env.BASE_URL}parameters/country`, {
                    state: { country_id: row.id, enabled: true },
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
          navigate(`${import.meta.env.BASE_URL}parameters/country/country-crud/`);
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
        onDeleteRow={(row) => {
          deleteCountry(row.id);
        }}
        exportFileName="countries"
        showExportButtons={true}
      />
    </>
  );
}
