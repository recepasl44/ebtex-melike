import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../ReusableTable";
import FilterGroup, {
  FilterDefinition,
} from "../../guidance/components/organisms/SearchFilter";
import { useProgramsTable } from "../../../hooks/program/useList";
import { useQuizStudentsList } from "../../../hooks/quizstudents/useList";
import onlineExam from "./table";

const OnlineExam = () => {
  const navigate = useNavigate();
  const [program_id, setProgramId] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [quizTypeId, setQuizTypeId] = useState("");
  const [examName, setExamName] = useState("");
  const [publicationName, setPublicationName] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [examStatus, setExamStatus] = useState("");
   
  const [filtersEnabled, setFilterEnabled] = useState({
    program_id: false,
    level_id: false,
    source_name: false,
    quiz_type_id: false,
    exam_name: false,
    publication_name: false,
    status: false,
    student_name: false,
    student_class: false,
    exam_status: false,
  });

  const { programsData } = useProgramsTable({
    enabled: filtersEnabled.program_id,
  });

  const {
    quizStudentsData, 
    page: studentPage,
    paginate: studentPaginate,
    setPage: setStudentPage, 
    setPaginate: setStudentPaginate,
    totalPages: studentTotalPages,
    totalItems: studentTotalItems,
    loading: studentLoading,
    error,
  } = useQuizStudentsList({
    enabled: true,
    program_id: program_id,
    start_date: startDate,
    end_date: endDate,
    quiz_type_id: quizTypeId,
    exam_name: examName,
    publication_name: publicationName,
    status: status,
    student_name: studentName,
    student_class: studentClass,
    exam_status: examStatus,
  });
  
  const studentOptions = useMemo(() => {
    if (!quizStudentsData || !quizStudentsData.length) return [];
    
    return Array.from(
      new Set(
        quizStudentsData
          .filter(item => item.student && item.student.first_name && item.student.last_name)
          .map(item => `${item.student.first_name} ${item.student.last_name}`)
      )
    ).map(name => ({
      value: name,
      label: name,
      key: name,
    }));
  }, [quizStudentsData]);

  const classOptions = useMemo(() => {
    if (!quizStudentsData || !quizStudentsData.length) return [
      { value: "12/A", label: "12/A", key: "12A" },
      { value: "12/B", label: "12/B", key: "12B" },
      { value: "12/C", label: "12/C", key: "12C" },
      { value: "12/D", label: "12/D", key: "12D" },
    ];
    
    const programLevels = quizStudentsData
      .filter(item => item.student && item.student.level && item.student.level.name)
      .map(item => ({
        id: item.student.level.id,
        name: item.student.level.name
      }));
    
    return Array.from(
      new Map(programLevels.map(item => [item.id, item])).values()
    ).map(level => ({
      value: level.name,
      label: level.name,
      key: level.id,
    }));
  }, [quizStudentsData]);

  const quizTypes = useMemo(() => {
    if (!quizStudentsData || !quizStudentsData.length) return [];

    const types = quizStudentsData
      .filter(item => item.quiz && item.quiz.quiz_type && item.quiz.quiz_type.name)
      .map(item => ({
        id: item.quiz.quiz_type_id,
        name: item.quiz.quiz_type.name,
      }));

    return Array.from(new Map(types.map(item => [item.id, item])).values());
  }, [quizStudentsData]);

  const examNames = useMemo(() => {
    if (!quizStudentsData || !quizStudentsData.length) return [];

    return Array.from(
      new Set(
        quizStudentsData
          .filter(item => item.quiz && item.quiz.quiz_name)
          .map(item => item.quiz.quiz_name)
      )
    ).map(name => ({
      value: name,
      label: name,
      key: name,
    }));
  }, [quizStudentsData]);

  const publicationNames = useMemo(() => {
    if (!quizStudentsData || !quizStudentsData.length) return [];

    return Array.from(
      new Set(
        quizStudentsData
          .filter(item => item.quiz && item.quiz.short_name)
          .map(item => item.quiz.short_name)
      )
    ).map(name => ({
      value: name,
      label: name,
      key: name,
    }));
  }, [quizStudentsData]);

  const sourceOptions = useMemo(() => {
    if (!quizStudentsData || !quizStudentsData.length) return [];

    return Array.from(
      new Set(
        quizStudentsData
          .filter(item => item.quiz && item.quiz.source && item.quiz.source.name)
          .map(item => ({
            value: item.quiz.source.name,
            label: item.quiz.source.name,
            key: item.quiz.source.id || item.quiz.id,
          }))
      )
    );
  }, [quizStudentsData]);

  const onPageChange = (newPage: number) => {
    setStudentPage(newPage);
  };

  const onPageSizeChange = (newSize: number) => {
    setStudentPaginate(newSize);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilterEnabled((prev) => ({
      ...prev,
      [key]: true,
    }));
    if (key === "program_id") setProgramId(value);
    if (key === "source_name") setSourceName(value);
    if (key === "quiz_type_id") setQuizTypeId(value);
    if (key === "exam_name") setExamName(value);
    if (key === "publication_name") setPublicationName(value);
    if (key === "status") setStatus(value);
    if (key === "startDate") setStartDate(value);
    if (key === "endDate") setEndDate(value);
    if (key === "student_name") setStudentName(value);
    if (key === "student_class") setStudentClass(value);
    if (key === "exam_status") setExamStatus(value);
  };

  const statusOptions = [
    { value: "0", label: "Devam ediyor", key: "0" },
    { value: "1", label: "Tamamlandı", key: "1" },
    { value: "2", label: "İptal edildi", key: "2" },
    { value: "3", label: "İlerde yayınlanacak", key: "3" },
  ];

  const examStatusOptions = [
    { value: "Aktif", label: "Aktif", key: "aktif" },
    { value: "Ayrıldı", label: "Ayrıldı", key: "ayrildi" },
    { value: "Bağlantı Koptu", label: "Bağlantı Koptu", key: "baglanti_koptu" },
    { value: "Tamamlandı", label: "Tamamlandı", key: "tamamlandi" },
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
      options: sourceOptions,
    },
    {
      key: "publication_name",
      label: "Yayın Adı",
      type: "select",
      value: publicationName,
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, publication_name: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("publication_name", val);
      },
      options: publicationNames,
    },
    {
      key: "student_name",
      label: "Öğrenci Adı",
      type: "select",
      value: studentName,
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, student_name: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("student_name", val);
      },
      options: studentOptions,
    },
    {
      key: "student_class",
      label: "Sınıf",
      type: "select",
      value: studentClass,
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, student_class: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("student_class", val);
      },
      options: classOptions,
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
    {
      key: "exam_status",
      label: "Sınav Durumu",
      type: "select",
      value: examStatus,
      onClick: () => {
        setFilterEnabled((prev) => ({ ...prev, exam_status: true }));
      },
      onChange: (val: string) => {
        handleFilterChange("exam_status", val);
      },
      options: examStatusOptions,
    },
  ];

  return (
    <div>
      <FilterGroup filters={filters} navigate={navigate} columnsPerRow={4} />
      <ReusableTable
        columns={onlineExam().columnsOnlineExam}
        data={quizStudentsData || []}
        loading={studentLoading}
        currentPage={studentPage}
        totalPages={studentTotalPages}
        totalItems={studentTotalItems}
        pageSize={studentPaginate}
        tableMode="single"
        error={error}
        showExportButtons={true}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default OnlineExam;