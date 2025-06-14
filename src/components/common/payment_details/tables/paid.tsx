import { useMemo } from "react";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useShowStudent } from "../../../hooks/student/useShowStudent";
import { formatCurrency, formatDate } from "../../../../utils/formatters";

export default function PaidTable() {
  // Öğrenci verisini çekmek için hook
  const { student: data, error } = useShowStudent();

  // Ödenmiş taksitleri tabloya uygun formata dönüştürmeyi optimize edildi
  const paidInstallments = useMemo(() => {
    if (!data?.enrollments?.length) return [];

    return data.enrollments.flatMap((enrollment) =>
      (enrollment.installments || [])
        .filter((installment) => installment.is_paid === 1)
        .map((installment) => ({
          ...installment,
          service_name:
            enrollment.service
              ? enrollment.service.name
              : `Kayıt #${enrollment.id}`,
          amount_paid: installment.amount,
        }))
    );
  }, [data]);

  // Tablo kolonları
  const columns: ColumnDefinition<any>[] = [
    {
      key: "payment_date",
      label: "Ödeme Tarihi",
      render: (row) => formatDate(row.payment_date),
    },
    {
      key: "amount",
      label: "Tutar",
      render: (row) => formatCurrency(row.amount),
    },
    {
      key: "service_name",
      label: "Hizmet",
      render: (row) => row.service_name || "-",
    },
  ];

  // Hesaplamaları doğrudan türetilmiş değişkenlerle optimize edildi
  const totalPaidCount = paidInstallments.length;
  const totalPaid = useMemo(
    () =>
      paidInstallments.reduce(
        (sum, item) => sum + parseFloat(String(item.amount || "0")),
        0
      ),
    [paidInstallments]
  );

  return (
    <div className="p-3">
      {paidInstallments.length > 0 ? (
        <>
          <ReusableTable
            columns={columns}
            data={paidInstallments}
            error={error}
            totalItems={totalPaidCount}
          />

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-muted">Toplam {totalPaidCount} ödeme</span>
            </div>
            <div>
              <span className="fw-bold">
                Toplam: {formatCurrency(totalPaid)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center my-4">Ödenen taksit bulunmamaktadır.</p>
      )}
    </div>
  );
}
