import { Button } from "react-bootstrap";
import { QuestionCurriculumData } from "../../../../types/questioncurriculums/list";
import { ColumnDefinition } from "../../ReusableTable";

export const questionChangeColumns = (
  onQuestionSelect?: (questionCurriculum: QuestionCurriculumData) => void
): ColumnDefinition<QuestionCurriculumData>[] => [
  {
    key: "question.id",
    label: "Sıra No",
    render: (row) => row.question?.id || "-",
  },
  {
    key: "question.level_id",
    label: "Sınıf",
    render: (row) => row.question?.level_id || "-",
  },
  {
    key: "lesson.name",
    label: "Ders",
    render: (row) => row.lesson?.name || "-",
  },
  {
    key: "unit.name",
    label: "Ünite",
    render: (row) => row.unit?.name || "-",
  },
  {
    key: "chapter.name",
    label: "Bölüm",
    render: (row) => row.chapter?.name || "-",
  },
  {
    key: "actions",
    label: "İşlem",
    render: (row) => (
      <Button
        variant="info-light"
        size="sm"
        onClick={() => onQuestionSelect?.(row)}
        title="Değiştir"
      >
        <i className="bi bi-eye"></i>
      </Button>
    ),
  },
];
