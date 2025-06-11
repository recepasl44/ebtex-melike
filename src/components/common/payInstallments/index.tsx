import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import FilterGroup, { FilterDefinition } from "./component/organisms/SearchFilters";
import { useListStudents } from "../../hooks/student/useList";
import { useProgramsTable } from "../../hooks/program/useList";
import { useLevelsTable } from "../../hooks/levels/useList";
import { useClassroomList } from "../../hooks/classrooms/useList";
import { IStudent } from "../../../types/student/list";
import { formatCurrency, formatDate } from "../../../utils/formatters";



interface InstallmentRow {
  id: number;
  student_id: number;
  due_date: string;
  program: string | undefined;
  level: string | undefined;
  classroom: string | undefined;
  full_name: string;
  order_no: number;
  amount: string;
}

export default function PayInstallments() {
  const navigate = useNavigate();
  const [programId, setProgramId] = useState("");
  const [levelId, setLevelId] = useState("");
  const [classId, setClassId] = useState("");
  const [name, setName] = useState("");
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { programsData } = useProgramsTable({ enabled: true });
  const { levelsData } = useLevelsTable({
    enabled: !!programId,
    program_id: programId ? Number(programId) : undefined,
  });
  const { classroomData } = useClassroomList({
    enabled: !!levelId,
    branchId: undefined,
    program_id: programId ? Number(programId) : undefined,
    level_id: levelId ? Number(levelId) : undefined,
    page: 1,
    pageSize: 100,
  });

  const studentParams = {
    enabled: true,
    program_id: programId ? Number(programId) : undefined,
    level_id: levelId ? Number(levelId) : undefined,
    classroom_id: classId ? Number(classId) : undefined,
    first_name: name || undefined,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    page,
    paginate: pageSize,
  };

  const { data, loading, error, totalPages, totalItems } = useListStudents(studentParams);

  const rows: InstallmentRow[] = useMemo(() => {
    if (!data) return [];
    const list: InstallmentRow[] = [];
    data.forEach((stu: IStudent) => {
      const fullName = `${stu.first_name} ${stu.last_name}`;
      const program = stu.program?.name;
      const level = stu.level?.name;
      const classroom = stu.branche?.name;
      stu.enrollments?.forEach((enr) => {
        enr.installments?.forEach((inst) => {
          list.push({
            id: inst.id,
            student_id: stu.id,
            due_date: inst.due_date,
            program,
            level,
            classroom,
            full_name: fullName,
            order_no: inst.order_no,
            amount: inst.amount,
          });
        });
      });
    });
    return list;
  }, [data]);

  const columns: ColumnDefinition<InstallmentRow>[] = useMemo(
    () => [
      { key: "due_date", label: "Tarih", render: (r) => formatDate(r.due_date) },
      { key: "program", label: "Okul Seviyesi", render: (r) => r.program || "-" },
      { key: "level", label: "Sınıf Seviyesi", render: (r) => r.level || "-" },
      { key: "classroom", label: "Sınıf/Şube", render: (r) => r.classroom || "-" },
      { key: "full_name", label: "Adı Soyadı" },
      { key: "order_no", label: "Taksit No" },
      {
        key: "amount",
        label: "Taksit Tutarı",
        render: (r) => formatCurrency(r.amount),
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row) => (
          <Button
            variant="primary-light"
            size="sm"
            className="btn-icon rounded-pill"
            onClick={() => navigate(`/studentpaymentdetails/${row.student_id}`)}
          >
            <i className="ti ti-eye"></i>
          </Button>
        ),
      },
    ],
    [navigate]
  );

  const totalAmount = useMemo(
    () => rows.reduce((sum, r) => sum + parseFloat(r.amount || "0"), 0),
    [rows]
  );

  const footer = (
    <div className="d-flex justify-content-end fw-bold me-3">
      Toplam: {formatCurrency(totalAmount)}
    </div>
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "date_range",
        label: "Tarih Aralığı",
        type: "doubledate",
        value: dateRange,
        onChange: (val) => setDateRange(val || {}),
      },
      {
        key: "program_id",
        label: "Okul Seviyesi",
        type: "select",
        value: programId,
        options: (programsData || []).map((p) => ({ label: p.name, value: String(p.id) })),
        onChange: (val: string) => {
          setProgramId(val);
          setLevelId("");
          setClassId("");
        },
      },
      {
        key: "level_id",
        label: "Sınıf Seviyesi",
        type: "select",
        value: levelId,
        options: (levelsData || []).map((l) => ({ label: l.name, value: String(l.id) })),
        onChange: (val: string) => {
          setLevelId(val);
          setClassId("");
        },
      },
      {
        key: "classroom_id",
        label: "Sınıf/Şube",
        type: "select",
        value: classId,
        options: (classroomData || []).map((c: any) => ({ label: c.name, value: String(c.id) })),
        onChange: (val: string) => setClassId(val),
      },
      {
        key: "name",
        label: "Adı Soyadı",
        type: "text",
        value: name,
        onChange: (val: string) => setName(val),
      },
    ],
    [dateRange, programId, levelId, classId, name, programsData, levelsData, classroomData]
  );

  return (
    <>
      <FilterGroup
        filters={filters}
        navigate={navigate}
        columnsPerRow={4}
      />
      <ReusableTable<InstallmentRow>
        columns={columns}
        data={rows}
        loading={loading}
        error={error}
        showExportButtons={true}
        tableMode="single"
        pageTitle="Taksitler"
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(p) => setPage(p)}
        onPageSizeChange={(s) => {
          setPageSize(s);
          setPage(1);
        }}
        exportFileName="pay_installments"
        customFooter={footer}
      />
    </>
  );
}
