import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../ReusableTable";
import FilterGroup, {
  FilterDefinition,
} from "../../guidance/components/organisms/SearchFilter";
import { useProgramsTable } from "../../../hooks/program/useList";
import { useQuizzesList } from "../../../hooks/quizzes/useList";
import activeExam from "./table";
import { Alert } from "react-bootstrap";
import { useSourcesList } from "../../../hooks/sources/useList";
interface ListFilterProps {
  view: "all" | "soon" | "active";
  showAddButton?: boolean;
  showButton?: boolean;
}

const ListFilter: React.FC<ListFilterProps> = ({
  view,
  showAddButton = false,
  showButton = true,
}) => {
  const navigate = useNavigate();
  const [program_id, setProgramId] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [quizTypeId, setQuizTypeId] = useState("");
  const [examName, setExamName] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
    const [sourceId, setSourceId] = useState("");

  const [filtersEnabled, setFilterEnabled] = useState({
    program_id: false,
    level_id: false,
    source_name: false,
    quiz_type_id: false,
    exam_name: false,
    source_id: false,
    status: false,
  });
  const { sourcesData: examSources } = useSourcesList({
    enabled: filtersEnabled.source_name,
  });
  const { programsData: programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
  });

  const {
    quizzesData: sourcesData,
    paginate,
    page,
    setPage,
    setPaginate,
    totalPages,
    totalItems,
  } = useQuizzesList({
    enabled: true,
    program_id: program_id,
    start_date: startDate,
    end_date: endDate,
    quiz_type_id: quizTypeId,
    exam_name: examName,
    source_id: sourceId,
    status: status,
  });

  // Tarihleri güvenli bir şekilde parse eden yardımcı fonksiyon
  const parseDate = (dateString: string | null | undefined): Date | null => {
    if (!dateString) return null;
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  // En yakın tarihteki yaklaşan sınavları bulma
  const upcomingExams = useMemo(() => {
    if (!sourcesData || view !== "active") return [];

    const today = new Date();

    // Yaklaşan sınavları bul (status = 3 ve tarihi gelecekte)
    const upcoming = sourcesData.filter((quiz) => {
      const publishDate = parseDate(quiz.result_publish_datetime);
      if (!publishDate) return false;
      // Tüm gelecekteki yaklaşan sınavları filtrele
      return publishDate > today && quiz.status === 3;
    });

    // Yaklaşan sınavları tarihe göre sırala
    upcoming.sort((a, b) => {
      const dateA = parseDate(a.result_publish_datetime) || new Date();
      const dateB = parseDate(b.result_publish_datetime) || new Date();
      return dateA.getTime() - dateB.getTime();
    });

    // En yakın tarihi bul
    if (upcoming.length === 0) return [];
    const nextDate = parseDate(upcoming[0].result_publish_datetime);
    if (!nextDate) return [];

    // Sadece bu en yakın tarihteki sınavları filtrele
    return upcoming
      .filter((quiz) => {
        const quizDate = parseDate(quiz.result_publish_datetime);
        if (!quizDate) return false;

        // Aynı gün kontrolü için tarihleri karşılaştır
        return (
          quizDate.getFullYear() === nextDate.getFullYear() &&
          quizDate.getMonth() === nextDate.getMonth() &&
          quizDate.getDate() === nextDate.getDate()
        );
      })
      .map((quiz) => ({
        ...quiz,
        isUpcoming: true, // Yaklaşan sınavlar için özel bayrak
      }));
  }, [sourcesData, view]);

  // Aktif sınav verilerini tarih bazlı filtreleme
  const filteredActiveData = useMemo(() => {
    if (!sourcesData) return [];

    const today = new Date();

    if (view === "active") {
      // AKTIF GORUNTUMU: Bugünün tarihi, yayınlanma ve bitiş tarihleri arasında olan sınavlar
      return sourcesData.filter((quiz) => {
        const publishDate = parseDate(quiz.result_publish_datetime);
        const endDate = parseDate(quiz.quiz_date);

        // Eğer tarihler geçerli değilse filtreleme
        if (!publishDate || !endDate) return false;

        // Bugünün tarihi yayınlanma ve bitiş tarihleri arasında mı?
        return today >= publishDate && today <= endDate && quiz.status === 0;
      });
    }

    if (view === "soon") {
      // YAKLAŞAN GÖRÜNÜMÜ: Tüm gelecekteki yaklaşan sınavlar
      return sourcesData.filter((quiz) => {
        const publishDate = parseDate(quiz.result_publish_datetime);
        if (!publishDate) return false;

        // Gelecekteki tüm sınavları göster - 7 gün sınırlaması YOK
        return publishDate > today && quiz.status === 3;
      });
    }

    // Varsayılan: tüm verileri döndür
    return sourcesData;
  }, [sourcesData, view]);

  // Aktif ve yaklaşan sınavları birleştir
  const combinedData = useMemo(() => {
    if (view === "active") {
      // Aktif görünüm için yaklaşan sınavları ekle
      return [
        // Önce yaklaşan sınavlar
        ...upcomingExams,
        // Sonra aktif sınavlar
        ...filteredActiveData,
      ];
    }

    // Diğer görünümler için sadece filtrelenmiş veriyi döndür
    return view === "soon" ? filteredActiveData : sourcesData;
  }, [upcomingExams, filteredActiveData, view, sourcesData]);

  // Filtrelenmiş veriler için sayfalama değerlerini yeniden hesapla
  const filteredTotalItems = combinedData.length;
  const filteredTotalPages = Math.ceil(filteredTotalItems / paginate);

  // Geçerli sayfanın filtrelenmiş veriler için geçerli olduğundan emin ol
  useEffect(() => {
    if (page > filteredTotalPages && filteredTotalPages > 0) {
      setPage(1);
    }
  }, [filteredTotalPages, page, setPage]);

  // Geçerli sayfa için filtrelenmiş verileri paginate et
  const paginatedFilteredData = useMemo(() => {
    const startIndex = (page - 1) * paginate;
    return combinedData.slice(startIndex, startIndex + paginate);
  }, [combinedData, page, paginate]);

  // Yaklaşan sınavlar için en yakın tarih
  const upcomingDate = useMemo(() => {
    if (upcomingExams.length === 0) return null;
    return parseDate(upcomingExams[0].result_publish_datetime);
  }, [upcomingExams]);

  // Yaklaşan sınavların tarihini formatla
  const upcomingDateFormatted = useMemo(() => {
    if (!upcomingDate) return "";

    return upcomingDate.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [upcomingDate]);

  const quizTypes = useMemo(() => {
    if (!sourcesData) return [];

    const types = sourcesData
      .filter((quiz) => quiz.quiz_type && quiz.quiz_type.name)
      .map((quiz) => ({
        id: quiz.quiz_type_id,
        name: quiz.quiz_type?.name,
      }));

    // Remove duplicates by id
    return Array.from(new Map(types.map((item) => [item.id, item])).values());
  }, [sourcesData]);

  // Extract unique exam names from the data
  const examNames = useMemo(() => {
    if (!sourcesData) return [];

    return Array.from(
      new Set(
        sourcesData
          .filter((quiz) => quiz.quiz_name)
          .map((quiz) => quiz.quiz_name)
      )
    ).map((name) => ({
      value: name,
      label: name,
      key: name,
    }));
  }, [sourcesData]);


  const handleFilterChange = (key: string, value: string) => {
    setFilterEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "program_id") setProgramId(value);
    if (key === "source_name") setSourceName(value);
    if (key === "quiz_type_id") setQuizTypeId(value);
    if (key === "exam_name") setExamName(value);
 if (key === "source_id") setSourceId(value);  
   if (key === "status") setStatus(value);
    if (key === "startDate") {
      setStartDate(value);
    }
    if (key === "endDate") {
      setEndDate(value);
    }
  };

  const statusOptions = [
    { value: "0", label: "Devam ediyor", key: "0" },
    { value: "1", label: "Tamamlandı", key: "1" },
    { value: "2", label: "İptal edildi", key: "2" },
    { value: "3", label: "İlerde yayınlanacak", key: "3" },
  ];

  const filters: FilterDefinition[] = [
    {
      key: "filter1",
      label: "Tarih Aralığı",
      type: "doubledate",
      onChange: (val: any) => {
        setStartDate(val.startDate);
        setEndDate(val.endDate);
        handleFilterChange("startDate", val.startDate);
        handleFilterChange("endDate", val.endDate);
      },
      value: {
        startDate: startDate,
        endDate: endDate,
      },
    },
    {
      key: "program_id",
      label: "Sınıf Seviyesi",
      value: program_id,
      type: "select",
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
      key: "source.name",
      label: "Sınav Kaynağı",
      type: "select",
      value: sourceName,
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, source_name: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("source_name", val);
      },
      options: (sourcesData || [])
        .filter((quiz) => quiz.source && quiz.source.name)
        .map((quiz) => ({
          value: quiz.source.name,
          label: quiz.source.name,
          key: quiz.source.id || quiz.id,
        })),
    },
    {
      key: "quiz_type_id",
      label: "Sınav Türü",
      type: "select",
      value: quizTypeId,
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, quiz_type_id: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("quiz_type_id", val);
      },
      options: quizTypes.map((type) => ({
        value: String(type.id),
        label: type.name,
        key: type.id,
      })),
    },
    {
      key: "exam_name",
      label: "Sınav Adı",
      type: "select",
      value: examName,
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, exam_name: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("exam_name", val);
      },
      options: examNames,
    },{
    key: "source_id",
      label: "Yayın Adı",
      type: "select",
      value: sourceId,
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, source_name: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("source_id", val);
      },
      options: (examSources || []).map((source) => ({
        value: String(source.id),
        label: source.name,
        key: source.id,
      })),
    },
    {
      key: "status",
      label: "Durum",
      type: "select",
      value: status,
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, status: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("status", val);
      },
      options: statusOptions,
    },
  ];

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (newSize: number) => {
    setPaginate(newSize);
  };

  return (
    <div>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={4} />

      {/* Yaklaşan sınavlar hakkında bilgilendirme mesajı */}
      {view === "active" && upcomingExams.length > 0 && (
        <Alert variant="info" className="mb-3">
          <i className="bi bi-info-circle me-2"></i>
          <strong>{upcomingDateFormatted}</strong> tarihinde yaklaşan{" "}
          {upcomingExams.length} sınav bulunuyor. Bu sınavlar tabloda pasif
          olarak gösterilmektedir.
        </Alert>
      )}

    <ReusableTable
  columns={
    activeExam(
      upcomingExams.length > 0 ? { hasUpcomingExams: true } : undefined
    ).columnsActiveExam
  }
  data={view !== "all" ? paginatedFilteredData : sourcesData}
  button={showButton ? (showAddButton ? 
    () => navigate("/exams/new") : 
    () => navigate("/online-exam/tabActive/crudAgain")) : undefined
  }
  buttonText={showButton ? (showAddButton ? "Ekle" : "Tekrarla") : undefined}
  loading={false}
  currentPage={page}
  totalPages={view !== "all" ? filteredTotalPages : totalPages}
  totalItems={view !== "all" ? filteredTotalItems : totalItems}
  pageSize={paginate}
  tableMode="single"
  error={null}
  onPageChange={onPageChange}
  onPageSizeChange={onPageSizeChange}
  showExportButtons={true}
  exportFileName="observations"
/>
    </div>
  );
};

export default ListFilter;
