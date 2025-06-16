
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../../../../ReusableTable";
import { useCouponPriceShow } from "../../../../../hooks/employee/coupon_price/useCouponPriceShow";
import { useCouponPriceDelete } from "../../../../../hooks/employee/coupon_price/useCouponPriceDelete";
import { CouponPrice } from "../../../../../../types/employee/coupon_price/list";

interface CouponTabProps {
  personelId: number;
  enabled: boolean;
}

export default function CouponTab({ personelId, enabled }: CouponTabProps) {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<CouponPrice[]>([]);

  const {
    getCouponPrice,
    loading: loadingShow,
    error: errorShow,
  } = useCouponPriceShow();

  const {
    deleteExistingCouponPrice,
    error: deleteError,
  } = useCouponPriceDelete();

  // fetch the person's coupon‐price records via SHOW hook
  useEffect(() => {
    if (!enabled) return;
    (async () => {
      const res = await getCouponPrice(personelId);
      const arr = Array.isArray(res) ? res : res ? [res] : [];
      setCoupons(arr);
    })();
  }, [enabled, personelId, getCouponPrice]);

  const columns: ColumnDefinition<CouponPrice>[] = useMemo(
    () => [
      {
        key: "tarih",
        label: "Tarih",
        render: (row) => row.tarih || "-",
      },
      {
        key: "urun_adi",
        label: "Satış Adı",
        render: (row) => row.urun_adi || "-",
      },
      {
        key: "satis_ucreti",
        label: "Ücreti",
        render: (row) =>
          row.satis_ucreti
            ? `${Number(row.satis_ucreti).toLocaleString()} ₺`
            : "0,00 ₺",
      },
      {
        key: "kupon_yuzde",
        label: "Kupon %",
        render: (row) => `${row.kupon_yuzdesi ?? 0}%`,
      },
      {
        key: "gelir",
        label: "Gelir",
        render: (row) =>
          row.gelir
            ? `${Number(row.gelir).toLocaleString()} ₺`
            : "0,00 ₺",
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
                navigate(`/personelCouponCrud/${row.id}`, {
                  state: {
                    personelId,
                    selectedCoupon: coupons.find((c) => c.id === row.id),
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
    [navigate, personelId, coupons]
  );

  const handleDelete = (row: CouponPrice) => {
    if (row.id) deleteExistingCouponPrice(row.id);
  };

  // compute total
  const total = coupons.reduce((sum, c) => sum + (Number(c.gelir) || 0), 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>
          Kupon Ücreti — Toplam Gelir: {total.toFixed(2)} ₺
        </h6>
        <Button
          variant="success"
          onClick={() =>
            navigate("/personelCouponCrud", { state: { personelId } })
          }
        >
          Ekle
        </Button>
      </div>

      <ReusableTable<CouponPrice>
        columns={columns}
        data={coupons}
        loading={loadingShow}
        error={errorShow || deleteError}
        currentPage={1}
        totalPages={1}
        totalItems={coupons.length}
        pageSize={coupons.length}
        onPageChange={() => { }}
        onPageSizeChange={() => { }}
        exportFileName="kupon_ucreti"
        showExportButtons
        onDeleteRow={handleDelete}
      />
    </div>
  );
}
