import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import { useMemo, useState } from "react";
import { useListStudents } from "../../hooks/student/useList";
import { IStudent } from "../../../types/student/list";
import { Button } from "react-bootstrap";
import FilterGroup, {
  FilterDefinition,
} from "./component/organisms/SearchFilters";
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
  const [page, setPage] = useState<number>(1);
  const [paginate, setPaginate] = useState<number>(10);

  const [filtersEnabled, setFiltersEnabled] = useState({
    branch: false,
    program: false,
    level: false,
    class: false,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFiltersEnabled((prev) => ({ ...prev, [key]: true }));
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
    page,
    paginate,
  };
  const { branchData } = useBranchTable({ enabled: filtersEnabled.branch });
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

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "branch",
        label: "Şube",
        type: "select" as const,
        value: branch,
        options: (branchData || []).map((b) => ({ value: String(b.id), label: b.name })),
        onClick: () => setFiltersEnabled((p) => ({ ...p, branch: true })),
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

  const { data, loading, error, totalPages, totalItems } =
    useListStudents(paymentParams);

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
        label: "Ödenen Tutar",
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
        label: "İade Tutar",
        type: "currency",
        render: () => {
          return formatCurrency(0);
        },
      },
      {
        key: "remaining_amount",
        label: "Kalan Tutar",
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
        key: "overdue_amount",
        label: "Geciken Tutar",
        type: "currency",
        render: (row: any) => {
          if (!row.enrollments || !Array.isArray(row.enrollments))
            return formatCurrency(0);

          const today = new Date();
          const overdue = row.enrollments.reduce((sum: any, enrollment: any) => {
            if (!enrollment.installments) return sum;
            return (
              sum +
              enrollment.installments.reduce((acc: number, inst: any) => {
                if (
                  inst.is_paid !== 1 &&
                  inst.due_date &&
                  new Date(inst.due_date) < today
                ) {
                  return acc + parseFloat(inst.amount || "0");
                }
                return acc;
              }, 0)
            );
          }, 0);
          return formatCurrency(overdue);
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

  const totals = useMemo(() => {
    if (!data) {
      return { paid: 0, refund: 0, remaining: 0, overdue: 0 };
    }
    const today = new Date();
    return data.reduce(
      (acc, row) => {
        const enrollments = Array.isArray(row.enrollments)
          ? row.enrollments
          : row.enrollments
            ? [row.enrollments]
            : [];

        const totalFee = enrollments.reduce((sum, e: any) => {
          return (
            sum + parseFloat(e.final_fee || e.total_fee || "0")
          );
        }, 0);

        const paid = row.payments && Array.isArray(row.payments)
          ? row.payments.reduce(
            (s: number, p: any) => s + parseFloat(p.amount_paid || "0"),
            0
          )
          : 0;

        const overdue = enrollments.reduce((sum: number, e: any) => {
          if (!e.installments) return sum;
          return (
            sum +
            e.installments.reduce((iSum: number, inst: any) => {
              if (
                inst.is_paid !== 1 &&
                inst.due_date &&
                new Date(inst.due_date) < today
              ) {
                return iSum + parseFloat(inst.amount || "0");
              }
              return iSum;
            }, 0)
          );
        }, 0);

        const remaining = totalFee - paid;

        acc.paid += paid;
        acc.remaining += remaining;
        acc.overdue += overdue;
        return acc;
      },
      { paid: 0, refund: 0, remaining: 0, overdue: 0 }
    );
  }, [data]);

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3">
      <span className="me-3">Ödenen: {formatCurrency(totals.paid)}</span>
      <span className="me-3">İade: {formatCurrency(totals.refund)}</span>
      <span className="me-3">Kalan: {formatCurrency(totals.remaining)}</span>
      <span>Geciken: {formatCurrency(totals.overdue)}</span>
    </div>
  );

  // Pager options
  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (newSize: number) => {
    setPaginate(newSize);
    setPage(1);
  };

  return (
    <>
      <FilterGroup
        filters={filters}
        navigate={navigate}
        columnsPerRow={4}
      />
      <ReusableTable<IStudent>
        columns={columns}
        // pageTitle="Öğrenci Ödeme Detayları"
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
        customFooter={footer}
      />
    </>
  );
}
