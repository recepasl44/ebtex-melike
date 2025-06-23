import { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { Compensation } from "../../../../../../types/employee/compensation/list";
import { useCompensationShow } from "../../../../../hooks/employee/compensation/useDetail";
import { useCompensationDelete } from "../../../../../hooks/employee/compensation/useDelete";

interface CompensationTabProps {
  personelId?: number;
  enabled?: boolean;
}

export default function CompensationTab({
  personelId,
  enabled = true,
}: CompensationTabProps) {
  const { id } = useParams<{ id?: string }>();
  const actualId = personelId ?? (id ? Number(id) : 0);
  const navigate = useNavigate();
  const [data, setData] = useState<Compensation[]>([]);

  const { getCompensation, loading, error } = useCompensationShow();
  const { deleteExistingCompensation, error: deleteError } =
    useCompensationDelete();

  useEffect(() => {
    if (!enabled) return;

    (async () => {
      const res = await getCompensation(actualId);
      const arr = Array.isArray(res) ? res : res ? [res] : [];
      setData(arr);
    })();
  }, [enabled, actualId]);

  const columns: ColumnDefinition<Compensation>[] = useMemo(
    () => [
      {
        key: "tarih",
        label: "Tarih",
        render: (row) =>
          ((row as any).tarih || row.created_at)?.split("T")[0] || "-",
      },
      {
        key: "tazminat_turu",
        label: "Tazminat Türü",
        render: (row) => row.tazminat_turu || "-",
      },
      {
        key: "odeme_sekli",
        label: "Ödeme Şekli",
        render: (row) => row.odeme_sekli || "-",
      },
      {
        key: "miktar",
        label: "Ödenen Tutar (₺)",
        render: (row) =>
          row.miktar ? `${Number(row.miktar).toLocaleString()} ₺` : "0,00 ₺",
      },
      {
        key: "banka_hesap_adi",
        label: "Banka Hesap Adı",
        render: (row) => row.banka_hesap_adi || "-",
      },
      {
        key: "aciklama",
        label: "Açıklama",
        render: (row) => row.aciklama || "-",
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                navigate(`/personelCompensationCrud/${row.id}`, {
                  state: {
                    personelId: actualId,
                    selectedCompensation: data.find((d) => d.id === row.id),
                  },
                })
              }
            >
              <i className="ti ti-pencil" />
            </Button>{" "}
            <Button
              size="sm"
              variant="danger"
              onClick={() => openDeleteModal?.(row)}
            >
              <i className="ti ti-trash" />
            </Button>
          </>
        ),
      },
    ],
    [navigate, actualId, data]
  );

  function handleDeleteRow(row: Compensation) {
    if (!row.id) return;
    deleteExistingCompensation(row.id);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Tazminatlar</h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelCompensationCrud", {
              state: { personelId: actualId },
            })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<Compensation>
        columns={columns}
        data={data}
        loading={loading}
        error={error || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={data.length}
        pageSize={data.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        exportFileName="tazminat"
        showExportButtons
        onDeleteRow={handleDeleteRow}
      />
    </div>
  );
}
