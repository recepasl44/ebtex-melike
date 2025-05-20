import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useMemo } from "react";
import { useListStudents } from "../../hooks/student/useList";
import { IStudent } from "../../../types/student/list";
import { Button } from "react-bootstrap";
import { formatCurrency, formatDate } from "../../../utils/formatters";

export default function PaymentDetailsTable() {
  const navigate = useNavigate();

  const paymentParams = {
    enabled: true,
  };

  const {
    data,
    loading,
    error,
    totalPages,
    totalItems,
    page,
    paginate,
    setPage,
    setPaginate,
  } = useListStudents(paymentParams);

  const columns: ColumnDefinition<IStudent>[] = useMemo(
    () => [
      {
        key: "identification_no",
        label: "TC Kimlik No",
        render: (row) => (row.identification_no ? row.identification_no : "-"),
      },
      {
        key: "first_name",
        label: "Adı Soyadı",
        render: (row: any) =>
          row.first_name
            ? row.first_name + " " + row.last_name
            : "-" + row.last_name,
      },
      {
        key: "level_id",
        label: "Sınıf Seviyesi",
        render: (row) =>
          row.level ? String((row.level as { name: string }).name) : "-",
      },
      {
        key: "start_installment_date",
        label: "Kayıt Tarihi",
        type: "date",
        render: (row: any) => {
          if (!row.enrollments) return "-";

          const enrollment = Array.isArray(row.enrollments)
            ? row.enrollments[0]
            : row.enrollments;

          if (!enrollment?.service?.start_installment_date) return "-";
          // Kayıt tarihini formatla
          return formatDate(enrollment.service.start_installment_date);
        },
      },
      {
        key: "total_fee",
        label: "Kayıt Ücreti",
        type: "currency",
        render: (row: any) => {
          if (!row.enrollments) return "-";

          const enrollment = Array.isArray(row.enrollments)
            ? row.enrollments[0]
            : row.enrollments;

          if (!enrollment?.total_fee) return formatCurrency(0);
          return formatCurrency(enrollment.total_fee);
        },
      },
      {
        key: "order_no",
        label: "Taksit Sayısı",
        render: (row: any) => {
          if (
            !row.enrollments ||
            !Array.isArray(row.enrollments) ||
            row.enrollments.length === 0
          )
            return "-";

          const enrollment = row.enrollments[0];

          if (!enrollment?.installments) return "-";
          return enrollment.installments.length;
        },
      },
      {
        key: "end_installment_date",
        label: "Son Tarih",
        type: "date",
        render: (row: any) => {
          if (!row.enrollments) return "-";

          const enrollment = Array.isArray(row.enrollments)
            ? row.enrollments[0]
            : row.enrollments;

          if (!enrollment?.service?.end_installment_date) return "-";
          return formatDate(enrollment.service.end_installment_date);
        },
      },
      {
        key: "amount_paid",
        label: "Ödenen",
        type: "currency",
        render: (row: any) => {
          if (
            !row.payments ||
            !Array.isArray(row.payments) ||
            row.payments.length === 0
          )
            return formatCurrency(0);

          // Tüm ödemeleri topla - tek bir ödeme yerine bütün ödeme kayıtlarının toplamını göster
          const totalPaid = row.payments.reduce(
            (sum: any, payment: any) =>
              sum + parseFloat(payment.amount_paid || "0"),
            0
          );

          return formatCurrency(totalPaid);
        },
      },
      {
        key: "refund",
        label: "İade",
        type: "currency",
        render: () => {
          return formatCurrency(0);
        },
      },
      {
        key: "remaining_amount",
        label: "Kalan Miktar",
        type: "currency",
        render: (row: any) => {
          try {
            // Kayıt kontrolü
            if (
              !row.enrollments ||
              !Array.isArray(row.enrollments) ||
              row.enrollments.length === 0
            )
              return formatCurrency(0);

            // Tüm kayıtların toplam ücretini hesapla
            const totalFee = row.enrollments.reduce(
              (sum: any, enrollment: any) =>
                sum +
                parseFloat(enrollment.final_fee || enrollment.total_fee || "0"),
              0
            );

            // Tüm ödemeleri topla
            const totalPaid =
              row.payments && Array.isArray(row.payments)
                ? row.payments.reduce(
                    (sum: any, payment: any) =>
                      sum + parseFloat(payment.amount_paid || "0"),
                    0
                  )
                : 0;

            // Kalan miktarı hesapla ve formatla
            const remainder = totalFee - totalPaid;
            return formatCurrency(remainder);
          } catch (error) {
            console.error("Kalan miktar hesaplanırken hata:", error);
            return "-";
          }
        },
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <>
            <Button
              variant="primary-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => navigate(`/studentpaymentdetails/${row.id}`)}
            >
              <i className="ti ti-eye"></i>
            </Button>{" "}
            <Button
              variant="danger-light"
              size="sm"
              className="btn-icon rounded-pill"
              onClick={() => openDeleteModal && openDeleteModal(row)}
            >
              <i className="ti ti-trash"></i>
            </Button>
          </>
        ),
      },
    ],
    [navigate]
  );

  // Pager options
  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (newSize: number) => {
    setPaginate(newSize);
  };

  return (
    <ReusableTable<IStudent>
      columns={columns}
      pageTitle="Öğrenci Ödeme Detayları"
      data={data}
      loading={loading}
      error={error}
      showModal={false}
      showExportButtons={true}
      tableMode="single"
      totalPages={totalPages}
      totalItems={totalItems}
      currentPage={page}
      pageSize={paginate}
      exportFileName="student_payment_details"
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
