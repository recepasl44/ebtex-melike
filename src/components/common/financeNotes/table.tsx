import { useMemo, useState } from "react";
import ReusableTable, { ColumnDefinition, FilterDefinition } from "../ReusableTable";

interface FinanceNote {
  branch: string;
  schoolNo: string;
  tcNo: string;
  name: string;
  classLevel: string;
  classBranch: string;
  date: string;
  note: string;
  promiseDate: string;
  user: string;
}

const sampleData: FinanceNote[] = [
  {
    branch: "Merkez",
    schoolNo: "1001",
    tcNo: "12345678901",
    name: "Ahmet Yılmaz",
    classLevel: "10",
    classBranch: "A",
    date: "2024-06-10",
    note: "Ödeme gecikmesi hakkında bilgi verildi",
    promiseDate: "2024-06-20",
    user: "Admin",
  },
];

export default function FinanceNotesTable() {
  const [season, setSeason] = useState("");
  const [branch, setBranch] = useState("");
  const [schoolLevel, setSchoolLevel] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [classBranch, setClassBranch] = useState("");
  const [student, setStudent] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: ColumnDefinition<FinanceNote>[] = useMemo(
    () => [
      { key: "branch", label: "Şube" },
      { key: "schoolNo", label: "Okul No" },
      { key: "tcNo", label: "T.C. Kimlik No" },
      { key: "name", label: "Adı Soyadı" },
      { key: "classLevel", label: "Sınıf Seviyesi" },
      { key: "classBranch", label: "Sınıf/Şube" },
      { key: "date", label: "Tarih" },
      { key: "note", label: "Not" },
      { key: "promiseDate", label: "Söz Verme Tarihi" },
      { key: "user", label: "Kullanıcı" },
    ],
    []
  );

  const filters: FilterDefinition[] = useMemo(
    () => [
      {
        key: "season",
        label: "Sezon",
        type: "select",
        value: season,
        options: [
          { label: "2023-2024", value: "2023" },
          { label: "2024-2025", value: "2024" },
        ],
        onChange: (val: string) => {
          setSeason(val);
          setPage(1);
        },
      },
      {
        key: "branch",
        label: "Şube",
        type: "select",
        value: branch,
        options: [
          { label: "Merkez", value: "merkez" },
          { label: "Şube 2", value: "sube2" },
        ],
        onChange: (val: string) => {
          setBranch(val);
          setPage(1);
        },
      },
      {
        key: "school_level",
        label: "Okul Seviyesi",
        type: "select",
        value: schoolLevel,
        options: [
          { label: "Lise", value: "lise" },
          { label: "Ortaokul", value: "orta" },
        ],
        onChange: (val: string) => {
          setSchoolLevel(val);
          setPage(1);
        },
      },
      {
        key: "class_level",
        label: "Sınıf Seviyesi",
        type: "select",
        value: classLevel,
        options: [
          { label: "9", value: "9" },
          { label: "10", value: "10" },
        ],
        onChange: (val: string) => {
          setClassLevel(val);
          setPage(1);
        },
      },
      {
        key: "class_branch",
        label: "Sınıf/Şube",
        type: "select",
        value: classBranch,
        options: [
          { label: "A", value: "A" },
          { label: "B", value: "B" },
        ],
        onChange: (val: string) => {
          setClassBranch(val);
          setPage(1);
        },
      },
      {
        key: "student",
        label: "Öğrenci",
        type: "text",
        value: student,
        onChange: (val: string) => {
          setStudent(val);
          setPage(1);
        },
      },
    ],
    [season, branch, schoolLevel, classLevel, classBranch, student]
  );

  const filtered = useMemo(() => {
    return sampleData.filter((row) => {
      return (
        (season ? row.date.includes(season) : true) &&
        (branch ? row.branch === branch : true) &&
        (schoolLevel ? row.classLevel === schoolLevel : true) &&
        (classLevel ? row.classLevel === classLevel : true) &&
        (classBranch ? row.classBranch === classBranch : true) &&
        (student ? row.name.toLowerCase().includes(student.toLowerCase()) : true)
      );
    });
  }, [season, branch, schoolLevel, classLevel, classBranch, student]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  return (
    <div className="container-fluid mt-3">
      <ReusableTable<FinanceNote>
        columns={columns}
        data={paginated}
        tableMode="single"
        showExportButtons
        filters={filters}
        currentPage={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={pageSize}
        onPageChange={(p) => setPage(p)}
        onPageSizeChange={(s) => {
          setPageSize(s);
          setPage(1);
        }}
        exportFileName="financial_notes"
      />
    </div>
  );
}
