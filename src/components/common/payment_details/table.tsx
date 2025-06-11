import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useMemo, useState } from "react";
import { useListStudents } from "../../hooks/student/useList";
import { IStudent } from "../../../types/student/list";
import { Button } from "react-bootstrap";
import { formatCurrency, formatDate } from "../../../utils/formatters";
import { useBranchTable } from "../../hooks/branch/useBranchList";
import { useProgramsTable } from "../../hooks/program/useList";
import { useLevelsTable } from "../../hooks/levels/useList";
import { useClassroomList } from "../../hooks/classrooms/useList";
export default function PaymentDetailsTable() {
  const navigate = useNavigate();

  const [branch, setBranch] = useState("");
  const [programId, setProgramId] = useState("");
  const [levelId, setLevelId] = useState("");
  const [classId, setClassId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilterChange = (key: string, value: string) => {
    if (key === "branch") setBranch(value);
    if (key === "program") setProgramId(value);
    if (key === "level") setLevelId(value);
    if (key === "class") setClassId(value);
  };

  const handleDateRangeChange = (dates: any) => {
    if (!dates) {
      setStartDate("");
      setEndDate("");
      return;
    }
    const { startDate: start, endDate: end } = dates;
    setStartDate(start || "");
    setEndDate(end || "");
  };
  const paymentParams = {
    enabled: true,
    branch_id: branch ? Number(branch) : undefined,
    program_id: programId ? Number(programId) : undefined,
    level_id: levelId ? Number(levelId) : undefined,
    classroom_id: classId ? Number(classId) : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  };
  const { branchData } = useBranchTable({ enabled: true, page: 1, pageSize: 100 });
  const { programsData } = useProgramsTable({
    enabled: !!branch,
    branch_id: branch ? Number(branch) : undefined,
  });
  const { levelsData } = useLevelsTable({
    enabled: !!programId,
    program_id: programId ? Number(programId) : undefined,
  });
  const { classroomData } = useClassroomList({
    enabled: !!levelId,
    branchId: branch ? Number(branch) : undefined,
    program_id: programId ? Number(programId) : undefined,
    level_id: levelId ? Number(levelId) : undefined,
    page: 1,
    pageSize: 100,
  });

  const getTotalPaid = (row: any) => {
    if (!row.payments || !Array.isArray(row.payments) || row.payments.length === 0) {
      return 0;
    }
    return row.payments.reduce(
      (sum: number, payment: any) => sum + parseFloat(payment.amount_paid || "0"),
      0
    );
  };

  const getRemaining = (row: any) => {
    if (!row.enrollments || !Array.isArray(row.enrollments) || row.enrollments.length === 0) {
      return 0;
    }
    const totalFee = row.enrollments.reduce(
      (sum: number, enrollment: any) =>
        sum + parseFloat(enrollment.final_fee || enrollment.total_fee || "0"),
      0
    );

    const totalPaid = getTotalPaid(row);
    return totalFee - totalPaid;
  };

  const getDelayed = (row: any) => {
    if (!row.enrollments) return 0;
    const today = new Date();
    let total = 0;
    row.enrollments.forEach((enroll: any) => {
      (enroll.installments || []).forEach((inst: any) => {
        const due = new Date(inst.due_date);
        const payments = (row.payments || []).filter(
          (p: any) => p.installment_id === inst.id
        );
        const paid = payments.reduce(
          (s: number, p: any) => s + parseFloat(p.amount_paid || "0"),
          0
        );
        const amount = parseFloat(inst.amount || "0");
        if (due < today && amount - paid > 0) {
          total += amount - paid;
        }
      });
    });
    return total;
  };

  const totals = useMemo(() => {
    if (!data || data.length === 0) {
      return { paid: 0, refund: 0, remaining: 0, delayed: 0 };
    }
    return data.reduce(
      (acc, row) => {
        acc.paid += getTotalPaid(row);
        acc.remaining += getRemaining(row);
        acc.delayed += getDelayed(row);
        // refund column currently returns 0 per row
        return acc;
      },
      { paid: 0, refund: 0, remaining: 0, delayed: 0 }
    );
  }, [data]);

  const filters = useMemo(
    () => [
      {
        key: "branch",
        label: "Şube",
        type: "select" as const,
        value: branch,
        options: (branchData || []).map((b) => ({ value: String(b.id), label: b.name })),
        onChange: (val: string) => handleFilterChange("branch", val),
      },
      {
        key: "program_id",
        label: "Okul Seviyesi",
        type: "select" as const,
        value: programId,
        options: (programsData || []).map((p) => ({ value: String(p.id), label: p.name })),
        onChange: (val: string) => handleFilterChange("program", val),
      },
      {
        key: "level_id",
        label: "Sınıf Seviyesi",
        type: "select" as const,
        value: levelId,
        options: (levelsData || []).map((l) => ({ value: String(l.id), label: l.name })),
        onChange: (val: string) => handleFilterChange("level", val),
      },
      {
        key: "classroom_id",
        label: "Sınıf",
        type: "select" as const,
        value: classId,
        options: (classroomData || []).map((c: any) => ({ value: String(c.id), label: c.name })),
        onChange: (val: string) => handleFilterChange("class", val),
      },
      {
        key: "date_range",
        label: "Kayıt Tarihi",
        type: "doubledate" as const,
        value: { startDate, endDate },
        onChange: handleDateRangeChange,
      },
    ],
    [
      branch,
      programId,
      levelId,
      classId,
      startDate,
      endDate,
      branchData,
      programsData,
      levelsData,
      classroomData,
    ]
  );

  const {
    data,
    loading,
    error,
    totalPages,
    totalItems,

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
        label: "Ödenen Tutar (Ödenen)",
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
        label: "İade Tutar (İade)",
        type: "currency",
        render: () => {
          return formatCurrency(0);
        },
      },
      {
        key: "remaining_amount",
        label: "Kalan Tutar (Kalan Miktar)",
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
        key: "delayed_amount",
        label: "Geciken Tutar",
        type: "currency",
        render: (row: any) => {
          if (!row.enrollments) return formatCurrency(0);
          const today = new Date();
          let total = 0;
          row.enrollments.forEach((enroll: any) => {
            (enroll.installments || []).forEach((inst: any) => {
              const due = new Date(inst.due_date);
              const payments = (row.payments || []).filter(
                (p: any) => p.installment_id === inst.id
              );
              const paid = payments.reduce(
                (s: number, p: any) => s + parseFloat(p.amount_paid || "0"),
                0
              );
              const amount = parseFloat(inst.amount || "0");
              if (due < today && amount - paid > 0) {
                total += amount - paid;
              }
            });
          });
          return formatCurrency(total);
        },
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <Button
            variant="primary-light"
            size="sm"
            className="btn-icon rounded-pill"
            onClick={() => navigate(`/studentpaymentdetails/${row.id}`)}
          >
            <i className="ti ti-eye"></i>
          </Button>
        ),
      },
    ],
    [navigate]
  );

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3">
      <span className="me-3">Toplam Ödenen: {formatCurrency(totals.paid)}</span>
      <span className="me-3">Toplam İade: {formatCurrency(totals.refund)}</span>
      <span className="me-3">Toplam Kalan: {formatCurrency(totals.remaining)}</span>
      <span>Toplam Geciken: {formatCurrency(totals.delayed)}</span>
    </div>
  );

  // Pager options


  return (
    <ReusableTable<IStudent>
      columns={columns}
      pageTitle="Öğrenci Ödeme Detayları"
      data={data}
      loading={loading}
      error={error}
      filters={filters}

      showModal={false}
      showExportButtons={true}
      tableMode="single"
      totalPages={totalPages}
      totalItems={totalItems}

      exportFileName="student_payment_details"
      customFooter={footer}

    />
  );
}
