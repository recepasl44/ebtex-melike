// src/pages/discounts/table.tsx
import { useState, useMemo, useEffect } from "react";
import ReusableTable, {
  ColumnDefinition,
  useDebounce,
} from "../../../ReusableTable";
import { useDiscountsTable } from "../../../../hooks/discounts/useList";
import { useDiscountDelete } from "../../../../hooks/discounts/useDelete";
import { DiscountData } from "../../../../../types/discounts/list";
import { formatCurrency } from "../../../../../utils/formatters";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateQueryParamsFromFilters } from "../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";

interface DiscountTableProps {
  serviceId?: number;
  enabled?: boolean;
}

type QueryParams = {
  [x: string]: any;
  name: string;
};

export default function DiscountTable({ serviceId }: DiscountTableProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState(""); // UI için
  const debouncedName = useDebounce<string>(inputName, 500);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [enabled, setEnabled] = useState(false);
  const { deleteExistingDiscount } = useDiscountDelete();
  const { state } = useLocation() as {
    state?: { service_id?: number; enabled?: boolean };
  };
  // serviceId prop'unu veya route state'inden gelen service_id'yi kullan
  const currentServiceId = serviceId || state?.service_id;

  // Hem prop hem de state değiştiğinde tabloyu güncelle
  useEffect(() => {
    if (currentServiceId) {
      setEnabled(true);
    }
  }, [currentServiceId]);
  const [filtersEnabled, setFiltersEnabled] = useState({
    name: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("discount_name")) setName(params.get("discount_name") || "");
  }, [location.search]);

  const filterState = useMemo(
    () => ({
      name: name,
    }),
    [name]
  );

  useEffect(() => {
    if (debouncedName) {
      // name güncellemesi
      setName(debouncedName);
      // API isteği için filtersEnabled güncellenmesi
      setFiltersEnabled((prev) => ({
        ...prev,
        name: true,
      }));
    }
  }, [debouncedName]);

  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    if (params.name) query.set("discount_name", params.name);

    query.set("discount_page", String(page));
    query.set("discount_page", String(pageSize));

    navigate(`?${query.toString()}`);
  };

  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const questionParams = useMemo(
    () => ({
      enabled: true,
      name: name,
    }),
    [name]
  );

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
      setPageSize(10);
    }
  }, [name]);

  const { discountsData, loading, error, totalPages, totalItems } =
    useDiscountsTable({
      enabled: enabled,
      page,
      pageSize,
      service_id: currentServiceId,
      questionParams,
      name: name,
    });

  // Filtre Tablosu
  const filters = useMemo(() => {
    return [
      {
        key: "name",
        label: "İndirim Adı",
        value: inputName,
        placeholder: "İndirim adı...",
        type: "text" as const,
        onChange: (val: any) => {
          setInputName(val);
          if (val) {
            const matchedDiscount = discountsData?.find(
              (item: any) => item.name.toLowerCase() === val.toLowerCase()
            );
            if (matchedDiscount) {
              if (matchedDiscount.name) {
                setName(matchedDiscount.name);
              }
            }
          } else {
            setName("");
          }
        },
        isEnabled: filtersEnabled.name,
      },
    ];
  }, [inputName]);

  // ANa tablo
  const columns: ColumnDefinition<DiscountData>[] = useMemo(() => {
    return [
      {
        key: "name",
        label: "Ad",
        render: (row) => row.name,
      },
      {
        key: "amount",
        label: "Tutar/Oran",
        render: (row) =>
          // discount_type = 0 => Yüzde / discount_type=1 => Tutar
          row.discount_type === 1
            ? formatCurrency(row.amount)
            : `%${row.amount}`,
      },
      {
        key: "discount_type",
        label: "Tip",
        render: (row) => (row.discount_type === 0 ? "Yüzde(%)" : "Tutar(+)"),
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <div className="d-flex gap-2">
            <button
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
              onClick={() => {
                navigate(`/discounts/crud/${row.id}`);
              }}
            >
              <i className="ti ti-pencil"></i>
            </button>
            <button
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              onClick={() => openDeleteModal && openDeleteModal(row)}
            >
              <i className="ti ti-trash"></i>
            </button>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <div>
      <ReusableTable<DiscountData>
        columns={columns}
        data={discountsData}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        filters={filters}
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={pageSize}
        tableMode="multi"
        showExportButtons={true}
        exportFileName="discounts"
        onAdd={() => {
          navigate("/discounts/crud", {
            state: { service_id: currentServiceId, enabled: enabled },
          });
        }}
        onDeleteRow={(row) => deleteExistingDiscount(row.id)}
        deleteMessage={(row) => `${row.name} adlı indirimi silmek istediğinize emin misiniz?`}
        deleteCancelButtonLabel="Vazgeç"
        deleteConfirmButtonLabel="Sil"
      />
    </div>
  );
}
