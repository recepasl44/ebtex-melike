import { useEffect, useMemo, useState } from "react";
import { useServiceTypesList } from "../../../../hooks/serviceTypes/useList";
import { useBranchTable } from "../../../../hooks/branch/useBranchList";
import { useProgramsTable } from "../../../../hooks/program/useList";
import { useLevelsTable } from "../../../../hooks/levels/useList";
import { useCoursesTable } from "../../../../hooks/course/useList";
import { useSchoolCategoriesList } from "../../../../hooks/schoolcategories/useList";
import { useNavigate } from "react-router-dom";
import { useUpdateQueryParamsFromFilters } from "../../../../hooks/utilshooks/useUpdateQueryParamsFromFilters";
import ReusableTable, {
  ColumnDefinition,
  useDebounce,
} from "../../../ReusableTable";
import { IService } from "../../../../../types/services/list";
import { useServicesTable } from "../../../../hooks/service/useList";
import {
  formatCurrency,
  formatDateForApi,
} from "../../../../../utils/formatters";
import { deleteServicetype } from "../../../../../slices/serviceTypes/delete/thunk";
import { Button } from "react-bootstrap";
import sec_buton from "../../../../../assets/images/media/sec-buton.svg";
import sec_hover from "../../../../../assets/images/media/sec-buton-hover.svg";

interface ServiceTableProps {
  // Parent bileşenden gelecek callback
  onSelectService?: (service: IService) => void;
}

type QueryParams = {
  [x: string]: any;
  name: string;
  branch: number;
  program_id: number;
  level_id: number;
  school_type_id: number;
  category_id: number;
  course_id: number;
  service_id: number;
  date_range: string[];
};

export default function ServiceManagementListPage({
  onSelectService,
}: ServiceTableProps) {
  const navigate = useNavigate();
  const [branch, setBranch] = useState("");
  const [program_id, setProgramId] = useState("");
  const [level_id, setLevelId] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [course_id, setCourseId] = useState("");
  const [school_type_id, setSchoolTypeId] = useState("");
  const [service_id, setServiceId] = useState("");
  const [start_installment_date, setStartInstallmentDate] = useState("");
  const [end_installment_date, setEndInstallmentDate] = useState("");
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState(""); // UI için
  const debouncedName = useDebounce<string>(inputName, 500);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filtersEnabled, setFilterEnabled] = useState({
    name: false,
    branch: false,
    program_id: false,
    level_id: false,
    school_type_id: false,
    category_id: false,
    course_id: false,
    service_id: false,
    start_installment_date: false,
    end_installment_date: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("name")) setName(params.get("name") || "");
    if (params.get("branch")) setBranch(params.get("branch") || "");
    if (params.get("program_id")) setProgramId(params.get("program_id") || "");
    if (params.get("level_id")) setLevelId(params.get("level_id") || "");
    if (params.get("category_id"))
      setCategoryId(params.get("category_id") || "");
    if (params.get("course_id")) setCourseId(params.get("course_id") || "");
    if (params.get("school_type_id"))
      setSchoolTypeId(params.get("school_type_id") || "");
    if (params.get("start_installment_date"))
      setStartInstallmentDate(params.get("start_installment_date") || "");
    if (params.get("end_installment_date"))
      setEndInstallmentDate(params.get("end_installment_date") || "");
    if (params.get("service_id")) setServiceId(params.get("service_id") || "");
    if (params.get("page")) setPage(parseInt(params.get("page") || "1"));
    if (params.get("pageSize"))
      setPageSize(parseInt(params.get("pageSize") || "10"));
  }, [location.search]);

  const { servicetypesData: serviceTypesFilterData } = useServiceTypesList({
    enabled: false,
    name: name,
  });

  const { branchData: branchData } = useBranchTable({
    enabled: filtersEnabled.branch,
  });

  const { programsData: programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
  });
  const { listData: listData } = useSchoolCategoriesList({
    enabled: filtersEnabled.school_type_id,
    page: 1,
    pageSize: 100,
  });
  const { coursesData: coursesData } = useCoursesTable({
    enabled: filtersEnabled.course_id,
    page: 1,
    pageSize: 100,
  });
  const {} = useServiceTypesList({
    enabled: filtersEnabled.service_id,
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilterEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "name") setInputName(value);
    if (key === "branch") setBranch(value);
    if (key === "program_id") setProgramId(value);
    if (key === "level_id") setLevelId(value);
    if (key === "category_id") setCategoryId(value);
    if (key === "course_id") setCourseId(value);
    if (key === "school_type_id") setSchoolTypeId(value);
    if (key === "service_id") setServiceId(value);
    if (key === "start_installment_date") setStartInstallmentDate(value);
    if (key === "end_installment_date") setEndInstallmentDate(value);
  };

  useEffect(() => {
    if (debouncedName) {
      // name güncellemesi
      setName(debouncedName);
      // API isteği için filtersEnabled güncellenmesi
      setFilterEnabled((prev) => ({
        ...prev,
        name: true,
      }));
    }
  }, [debouncedName]);

  const filterState = useMemo(
    () => ({
      name: name,
      branch: Number(branch) || 0,
      program_id: Number(program_id) || 0,
      level_id: Number(level_id) || 0,
      school_type_id: Number(school_type_id) || 0,
      category_id: Number(category_id) || 0,
      course_id: Number(course_id) || 0,
      service_id: Number(service_id) || 0,
      date_range: [
        start_installment_date ? start_installment_date : "",
        end_installment_date ? end_installment_date : "",
      ],
    }),
    [
      name,
      branch,
      program_id,
      level_id,
      school_type_id,
      category_id,
      course_id,
      service_id,
      start_installment_date,
      end_installment_date,
    ]
  );

  const updateQueryParams = (params: QueryParams) => {
    const query = new URLSearchParams();
    // Sadece dolu değerleri URL'e ekle
    if (params.name) query.set("name", params.name);
    if (params.branch) query.set("branche_id", String(params.branch)); // API ile uyumlu olması için branche_id
    if (params.program_id) query.set("program_id", String(params.program_id));
    if (params.level_id) query.set("level_id", String(params.level_id));
    if (params.school_type_id)
      query.set("type_id", String(params.school_type_id)); // API ile uyumlu olması için type_id
    if (params.category_id)
      query.set("schoolcategory_id", String(params.category_id)); // API ile uyumlu olması için schoolcategory_id
    if (params.date_range[0])
      query.set("start_installment_date", params.date_range[0]);
    if (params.date_range[1])
      query.set("end_installment_date", params.date_range[1]);
    if (params.course_id) query.set("course_id", String(params.course_id));

    // Sayfalama parametreleri her zaman ekle
    query.set("page", String(page));
    query.set("pageSize", String(pageSize));

    navigate(`?${query.toString()}`);
  };

  useUpdateQueryParamsFromFilters<QueryParams>(filterState, updateQueryParams);

  const levelParams = useMemo(
    () => ({
      enabled: program_id ? true : false,
      program_id: program_id,
    }),
    [program_id]
  );

  const { levelsData: programLevelsData } = useLevelsTable(levelParams);

  const filters = useMemo(() => {
    const basicFilters = [
      {
        key: "name",
        label: "Hizmet Adı",
        value: inputName,
        placeholder: "Hizmet adı...",
        type: "text" as const,
        onChange: (val: any) => {
          setInputName(val);
          if (val) {
            const matchedService = servicesData?.find(
              (item: any) => item.name.toLowerCase() === val.toLowerCase()
            );
            if (matchedService) {
              if (matchedService.name) {
                setName(matchedService.name);
              }
            }
          } else {
            setName("");
          }
        },
      },
      {
        key: "branch",
        label: "Şube",
        value: branch,
        type: "select" as const,
        onClick: () => {
          setFilterEnabled((prev) => ({ ...prev, branch: true }));
        },
        onChange: (val: string) => {
          handleFilterChange("branch", val);
        },
        options: (branchData || []).map((item) => ({
          value: String(item.id),
          label: item.name,
          key: item.id,
        })),
      },
      {
        key: "program_id",
        label: "Okul seviyesi",
        value: program_id,
        type: "select" as const,
        onClick: () => {
          setFilterEnabled((prev) => ({ ...prev, program_id: true }));
        },
        onChange: (val: string) => {
          handleFilterChange("program_id", val);
        },
        options: (programsData || []).map((item) => ({
          value: String(item.id),
          label: item.name,
          key: item.id,
        })),
      },
      {
        key: "level_id",
        label: "Sınıf Seviyesi",
        value: level_id,
        type: "select" as const,
        onChange: (val: string) => {
          handleFilterChange("level_id", val);
        },
        options: (programLevelsData || []).map((item) => ({
          value: String(item.id),
          label: item.name,
        })),
      },
      {
        key: "school_type_id",
        label: "Okul Türü",
        value: school_type_id,
        type: "select" as const,
        onClick: () => {
          setFilterEnabled((prev) => ({
            ...prev,
            school_type_id: true,
          }));
        },
        onChange: (value: string) => {
          // Change handler'ın doğru şekilde çalıştığından emin ol
          handleFilterChange("school_type_id", value);
        },
        options: (listData || []).map((item) => ({
          value: String(item.id),
          label: item.name,
          key: item.id,
        })),
      },
      {
        key: "course_id",
        label: "Alan",
        value: course_id,
        type: "select" as const,
        onClick: () => {
          setFilterEnabled((prev) => ({
            ...prev,
            course_id: true,
          }));
        },
        onChange: (val: string) => {
          handleFilterChange("course_id", val);
        },
        options: (coursesData || []).map((item) => ({
          value: String(item.id),
          label: item.name,
          key: item.id,
        })),
      },

      {
        key: "date_range",
        label: "Tarih Aralığı",
        value: [start_installment_date, end_installment_date],
        type: "doubledate" as const,
        onChange: (dates: any) => {
          // Gelen değer null'sa tarih aralığını temizle
          if (!dates) {
            handleFilterChange("start_installment_date", "");
            handleFilterChange("end_installment_date", "");
            return;
          }
          const startDate = dates.startDate || "";
          const endDate = dates.endDate || "";

          // API için uygun formatta tarihleri formatla
          const formattedStartDate = startDate
            ? formatDateForApi(startDate)
            : "";
          const formattedEndDate = endDate ? formatDateForApi(endDate) : "";

          // Formatlanmış tarihleri state'e kaydet
          handleFilterChange("start_installment_date", formattedStartDate);
          handleFilterChange("end_installment_date", formattedEndDate);
        },
      },
      {
        key: "service_id",
        label: "Hizmet Türü",
        value: service_id,
        type: "select" as const,
        onClick: () => {
          setFilterEnabled((prev) => ({
            ...prev,
            service_id: true,
          }));
        },
        onChange: (val: string) => {
          handleFilterChange("service_id", val);
        },
        options: (serviceTypesFilterData || []).map((item) => ({
          value: String(item.name),
          label: item.name,
          key: item.name,
        })),
        plus: "/servicetype-table",
      },
    ];

    return basicFilters;
  }, [name, branch, serviceTypesFilterData, branchData]);

  const questionParams = useMemo(
    () => ({
      enabled: true,
      page: page,
      pageSize: pageSize,
      name: name,
      branch: branch,
      program_id: program_id,
      level_id: level_id,
      school_type_id: school_type_id,
      category_id: category_id,
      course_id: course_id,
      service: service_id,
      start_installment_date: start_installment_date,
      end_installment_date: end_installment_date,
    }),
    [
      branch,
      name,
      page,
      pageSize,
      program_id,
      level_id,
      school_type_id,
      course_id,
      service_id,
      start_installment_date,
      end_installment_date,
    ]
  );

  const {
    data: servicesData,
    loading,
    error,
    totalPages,
    totalItems,
    setPage: updatePage,
    setPageSize: updatePageSize,
  } = useServicesTable(questionParams);

  const columns: ColumnDefinition<IService>[] = useMemo(
    () => [
      {
        key: "name",
        label: "Hizmet Adı",
        render: (row) => row.name,
      },
      {
        key: "price",
        label: "Ücret",
        render: (row) => formatCurrency(row.price),
      },
      {
        key: "actions",
        label: "İşlemler",
        render: (row, openDeleteModal) => (
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigate(`/service-crud/${row.id}`);
              }}
              className="btn btn-icon btn-sm btn-info-light rounded-pill"
            >
              <i className="ti ti-pencil" />
            </button>
            <button
              onClick={() => openDeleteModal && openDeleteModal(row)}
              className="btn btn-icon btn-sm btn-danger-light rounded-pill"
              style={{ marginLeft: "10px" }}
            >
              <i className="ti ti-trash" />
            </button>
            <Button
              onClick={() => {
                if (onSelectService) {
                  onSelectService(row);
                } else {
                  // Geriye dönük uyumluluk için navigate seçeneği kalıyor
                  navigate("/service-management", {
                    state: {
                      service_id: row.id,
                      enabled: true,
                    },
                  });
                }
              }}
              variant=""
              size="sm"
            >
              <img
                src={sec_buton}
                alt="Seç"
                style={{
                  width: "28px",
                  height: "28px",
                }}
                onMouseEnter={(e) => (e.currentTarget.src = sec_hover)}
                onMouseLeave={(e) => (e.currentTarget.src = sec_buton)}
              />
            </Button>{" "}
          </div>
        ),
      },
    ],
    [onSelectService]
  );
  return (
    <>
      <ReusableTable<IService>
        columns={columns}
        data={servicesData}
        loading={loading}
        error={error}
        showModal={false}
        filters={filters}
        tableMode="multi"
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={page}
        onAdd={() => {
          navigate("/service-crud/");
        }}
        onPageChange={(newPage) => {
          setPage(newPage);
          updatePage(newPage);
        }}
        onDeleteRow={(row) => {
          deleteServicetype(row.id);
        }}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          updatePageSize(newPageSize);
        }}
      />
    </>
  );
}
