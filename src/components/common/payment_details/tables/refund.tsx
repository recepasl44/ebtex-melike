import { useMemo } from "react";
import ReusableTable, { ColumnDefinition } from "../../ReusableTable";
import { useShowStudent } from "../../../hooks/student/useShowStudent";
import {
  formatAbsoluteAmount,
  formatDate,
} from "../../../../utils/formatters";

interface RefundTableProps {
  id: string;
}

export default function RefundTable({}: RefundTableProps) {
  // Öğrenci verisini çekmek için hook
  const { student: data, error } = useShowStudent();

  // İade verilerini tabloya uygun formata dönüştürme
  const refunds = useMemo(() => {
    if (!data?.payments) return [];

    // Sadece iade olan ödemeleri filtrele (negatif tutarlar iade olarak kabul edilir)
    return data.payments.filter(
      (payment) => payment.amount_paid && parseFloat(payment.amount_paid) < 0
    );
  }, [data]);

  // Toplam iade tutarını hesapla
  const totalRefunded = useMemo(() => {
    if (!refunds.length) return 0;

    return refunds.reduce((total, refund) => {
      const amount = parseFloat(refund.amount_paid || "0");
      return total + Math.abs(amount); // İade negatif olduğu için mutlak değeri alınır
    }, 0);
  }, [refunds]);

  // Tablo kolonları
  const columns: ColumnDefinition<any>[] = [
    {
      key: "payment_date",
      label: "Tarih",
      render: (row: any) => formatDate(row.payment_date),
    },
    {
      key: "amount_paid",
      label: "Tutar",
      render: (row) => formatAbsoluteAmount(row.amount_paid),
    },
    {
      key: "description",
      label: "Açıklama",
      render: (row) => row.description || "-",
    },
    {
      key: "status",
      label: "Durum",
      render: () => <span className="badge bg-danger">İade</span>,
    },
  ];

  return (
    <div className="p-3">
      <h6 className="mb-3">İadeler</h6>

      {refunds.length > 0 ? (
        <>
          <ReusableTable
            columns={columns}
            data={refunds}
            error={error}
            totalItems={refunds.length}
            exportFileName="refunds"
            showExportButtons={true}
          />

          <div className="d-flex justify-content-end mt-3">
            <div className="text-end">
              <strong>Toplam İade: </strong>
              {formatAbsoluteAmount(totalRefunded)}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-3">
          <p className="mb-0">İade kaydı bulunmamaktadır</p>
        </div>
      )}
    </div>
  );
}
