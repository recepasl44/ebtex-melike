import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReusableTable from "../../ReusableTable";
import { useQuestionCurriculumsList } from "../../../hooks/questioncurriculums/useList";
import { questionChangeColumns } from "./table";
import { QuestionCurriculumData } from "../../../../types/questioncurriculums/list";
import QuestionChangeModal from "./QuestionChangeModal";

interface QuestionChangeProps {
  onQuestionSelect?: (questionCurriculum: QuestionCurriculumData) => void;
}

const QuestionChange: React.FC<QuestionChangeProps> = ({
  onQuestionSelect,
}) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionCurriculumData | null>(null);
  
  // Parametreleri URL'den al
  const school_level = params.school_level || searchParams.get('school_level');
  const program_id = params.program_id || searchParams.get('program_id');
  const lesson_id = params.lesson_id || searchParams.get('lesson_id');
  const unit_id = params.unit_id || searchParams.get('unit_id');
  const chapter_id = params.chapter_id || searchParams.get('chapter_id');
  
  // Sayfalama state'leri
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState(10);

  // API parametreleri
  const apiParams = useMemo(() => ({
    enabled: true,
    page,
    paginate,
    school_level: school_level || undefined,
    program_id: program_id || undefined,
    lesson_id: lesson_id || undefined,
    unit_id: unit_id || undefined,
    chapter_id: chapter_id || undefined,
  }), [page, paginate, school_level, program_id, lesson_id, unit_id, chapter_id]);

  const {
    data: questionCurriculumsData,
    loading,
    meta,
    error,
  } = useQuestionCurriculumsList(apiParams);

  // Soru seçme fonksiyonu
  const handleQuestionSelect = (questionCurriculum: QuestionCurriculumData) => {
    if (onQuestionSelect) {
      onQuestionSelect(questionCurriculum);
    } else {
      // Modal aç
      setSelectedQuestion(questionCurriculum);
      setShowModal(true);
    }
  };

  // Modal kapatma
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuestion(null);
  };

  // Update sonrası refresh
  const handleUpdateSuccess = () => {
    // Refresh the data
    window.location.reload();
  };

  // Tablo kolonları
  const columns = useMemo(() => 
    questionChangeColumns(handleQuestionSelect), 
    [handleQuestionSelect]
  );

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const onPageSizeChange = (newSize: number) => {
    setPaginate(newSize);
    setPage(1);
  };

  const handleAddClick = () => {
  };

  return (
    <div>
      <ReusableTable
        columns={columns}
        data={questionCurriculumsData || []}
        loading={loading}
        currentPage={meta?.current_page || 1}
        totalPages={meta?.last_page || 1}
        totalItems={meta?.total || 0}
        pageSize={paginate}
        tableMode="single"
        error={error}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        showExportButtons={true}
        exportFileName="question-curriculums"
        onAdd={handleAddClick}
      />
      
      <QuestionChangeModal
        show={showModal}
        onHide={handleCloseModal}
        questionData={selectedQuestion}
        onUpdate={handleUpdateSuccess}
      />
    </div>
  );
};

export default QuestionChange;
