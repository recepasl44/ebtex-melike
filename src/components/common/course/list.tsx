import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable, {
  ColumnDefinition,
} from "../../../components/common/ReusableTable";
import { useCoursesTable } from "../../../components/hooks/course/useList";
import { data } from "../../../types/courses/list";
import { Button } from "react-bootstrap";
import { useBranchTable } from "../../../components/hooks/branch/useBranchList";
import { useListStudents } from "../../../components/hooks/student/useList";
import { useUpdateQueryParamsFromFilters } from "../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import { useDependentFiltersUpdate } from "../../hooks/utilshooks/useDependentFiltersUpdate";
import { useCourseDelete } from "../../../components/hooks/course/useDelete";

type QueryParams = {
  page: number;
  firstFilter: string;
  secondFilter: string;
  search: string;
  pageSize: number;
};

export default function CourseListPage() {
  const navigate = useNavigate();
  const [firstFilter, setFirstFilter] = useState("");
  const [secondFilter, setSecondFilter] = useState("");
  const { deleteExistingCourse } = useCourseDelete();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { branchData } = useBranchTable({ enabled: true });
  const branchOptions = useMemo(
    () =>
      branchData.map((b) => ({
        value: String(b.id),
        label: b.name,
      })),
    [branchData]
  );

  const studentHook = useListStudents(
    firstFilter ? { branch_id: firstFilter, enabled: true } : { enabled: false }
  );
  const { data: studentData } = studentHook;
  const studentOptions = useMemo(
    () =>
      studentData.map((s) => ({
        value: String(s.id),
        label: s.first_name,
      })),
    [studentData]
  );

  const filtersState = useMemo(
    () => ({
      firstFilter,
      secondFilter,
      search: searchTerm,
      page: 1,
      pageSize,
    }),
    [firstFilter, secondFilter, searchTerm, pageSize]
  );

  const updateCourseQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    query.set("page", String(params.page));
    query.set("firstFilter", params.firstFilter);
    query.set("secondFilter", params.secondFilter);
    query.set("search", params.search);
    query.set("pageSize", String(params.pageSize));
    navigate(`?${query.toString()}`);
  };

  useUpdateQueryParamsFromFilters<QueryParams>(
    filtersState,
    updateCourseQueryParams
  );
  useDependentFiltersUpdate(
    { firstFilter, secondFilter, search: searchTerm },
    (key, value) => {
      if (key === "secondFilter") setSecondFilter(value);
    },
    {
      secondFilter: {
        dependencyKey: "firstFilter",
        defaultValue: () => {
          const defaultOpt = studentOptions[0]?.value || "";
          return defaultOpt;
        },
      },
    }
  );

  const filters = useMemo(() => {
    const basicFilters = [
      {
        key: "firstFilter",
        label: "Şube",
        value: firstFilter,
        onChange: setFirstFilter,
        options: branchOptions,
        plus: "/test",
      },
      {
        key: "secondFilter",
        label: "Öğrenci",
        value: secondFilter,
        onChange: setSecondFilter,
        dependencyKey: "firstFilter",
        options: studentOptions,
      },
      {
        key: "search",
        label: "Arama",
        value: searchTerm,
        onChange: setSearchTerm,
      },
    ];
    return basicFilters;
  }, [firstFilter, secondFilter, searchTerm, branchOptions, studentOptions]);

  const courseParams = useMemo(
    () => ({
      enabled: true,
      paginate: pageSize,
      page: page,
      per_page: pageSize,
      searchTerm,
    }),
    [pageSize, page, searchTerm]
  );

  const {
    coursesData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: updatePage,
    setPageSize: updateTablePageSize,
  } = useCoursesTable(courseParams);

  // Güncellenmiş "İşlemler" kolonunda delete butonu ekleniyor.
  const columns: ColumnDefinition<data>[] = useMemo(() => [
    {
      key: 'name',
      label: 'Kurs adı',
    },
    {
      key: 'level',
      label: 'Level Name',
      render: (row) => row.level ? row.level.name : '',
    },
    {
      key: 'actions',
      label: 'İşlemler',
      render: (row, openDeleteModal) => (
        <>
          <Button variant="primary" size="sm" onClick={() => navigate(`/coursecrud/${row.id}`)}>
            Detaylar
          </Button>
          <Button variant="danger" size="sm" className="ms-1" onClick={() => openDeleteModal && openDeleteModal(row)}>
            Sil
          </Button>
        </>
      ),
    },
  ], [navigate]);

  return (
    <div className="">
      <div className="">
        <h4>Kurs Listesi</h4>
        <Button variant="success" onClick={() => navigate("/coursecrud")}>
          Kurs Ekle
        </Button>
      </div>
      <ReusableTable<data>
        columns={columns}
        tableMode="single"
        showExportButtons={true}
        data={coursesData}
        loading={loading}
        error={error}
        filters={filters}
        showModal={false}
        currentPage={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(newPage) => {
          setPage(newPage);
          updatePage(newPage);
        }}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          updateTablePageSize(newSize);
          setPage(1);
          updatePage(1);
        }}
        exportFileName="course"
        onDeleteRow={(row) => {
          deleteExistingCourse(row.id);
        }}
      />
    </div>
  );
}
