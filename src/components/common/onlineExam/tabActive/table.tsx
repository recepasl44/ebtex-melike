import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { QuizListItem } from "../../../../types/quizzes/list";
import { ColumnDefinition } from "../../ReusableTable";

function activeExam(_params?: any) {
  const navigate = useNavigate();

  // Status mapping for readable labels
  const statusLabels: Record<string, string> = {
    "0": "Devam ediyor",
    "1": "Tamamlandı",
    "2": "İptal edildi",
    "3": "İlerde yayınlanacak",
  };

  // Define the columns for the observation record table
  const activeExam: ColumnDefinition<QuizListItem>[] = [
    {
      key: "student.program.name",
      label: "Okul Seviyesi",
      render: (row: any) => {
        return row.level?.program.name || "-";
      },
    },
    {
      key: "quiz_name",
      label: "Sınav Adı",
      render: (row: any) => {
        return row.quiz_name || "-";
      },
    },
    {
      key: "quiz_type.name",
      label: "Sınav Türü",
      render: (row: any) => {
        return row.quiz_type?.name || "-";
      },
    },
    {
      key: "source.name",
      label: "Kaynak",
      render: (row: any) => {
        return row.source?.name || "-";
      },
    },
    {
      key: "result_publish_datetime",
      label: "Yayınlanma Tarihi/Saati",
      render: (row: any) => row.result_publish_datetime || "-",
    },
    {
      key: "result_publish_datetime",
      label: "Bitiş Tarihi/Saati",
      render: (row: any) => row.quiz_date || "-",
    },
    {
      key: "status",
      label: "Durum",
      render: (row: any) => {
        // Convert numeric status to readable text
        const status = row.status !== undefined ? String(row.status) : null;
        return status !== null ? statusLabels[status] || status : "-";
      },
    },
    {
      key: "id",
      label: "Katılım Sayısı",
      render: (row: any) => row.participants || "-",
    },
    {
      key: "actions",
      label: "İşlemler",
      render: (row: any) => {
        const status = row.status !== undefined ? String(row.status) : null;

        // Style for action buttons
        const buttonStyle = {
          fontSize: "0.875rem",
          width: "32px",
          height: "32px",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };

        switch (status) {
          case "0": // Devam ediyor
            return (
              <div className="d-flex gap-2 align-items-center">
                <Button
                  variant="info-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {
                    // Quiz verilerinden parametreleri çıkar ve ExamPractice'e git
                    const params = new URLSearchParams();
                    if (row.id) params.append('quiz_id', String(row.id));
                    if (row.level?.id) params.append('level_id', String(row.level.id));
                    if (row.level?.program?.id) params.append('program_id', String(row.level.program.id));
                    if (row.level?.program?.category?.id) params.append('category_id', String(row.level.program.category.id));
                    if (row.level?.program?.school_level) params.append('school_level', String(row.level.program.school_level));
                    
                    navigate(`/online-exam/exam-practice/${row.id}?${params.toString()}`);
                  }}
                  title="Görüntüle"
                >
                  <i className="bi bi-eye"></i>
                </Button>
                <Button
                  variant="warning-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() =>
                    navigate(`/online-exam/tabActive/crudAgain/${row.id}`)
                  }
                  title="Tekrarla"
                >
                  <i className="bi bi-arrow-repeat"></i>
                </Button>
                <Button
                  variant="danger-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {}}
                  title="İptal Et"
                >
                  <i className="bi bi-x-circle"></i>
                </Button>
              </div>
            );

          case "1": // Tamamlandı
            return (
              <div className="d-flex gap-2 align-items-center">
                <Button
                  variant="info-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {
                    // Quiz verilerinden parametreleri çıkar ve ExamPractice'e git
                    const params = new URLSearchParams();
                    if (row.id) params.append('quiz_id', String(row.id));
                    if (row.level?.id) params.append('level_id', String(row.level.id));
                    if (row.level?.program?.id) params.append('program_id', String(row.level.program.id));
                    if (row.level?.program?.category?.id) params.append('category_id', String(row.level.program.category.id));
                    if (row.level?.program?.school_level) params.append('school_level', String(row.level.program.school_level));
                    
                    navigate(`/online-exam/exam-practice/${row.id}?${params.toString()}`);
                  }}
                  title="Görüntüle"
                >
                  <i className="bi bi-eye"></i>
                </Button>
                <Button
                  variant="warning-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() =>
                    navigate(`/online-exam/tabActive/crudAgain/${row.id}`)
                  }
                  title="Tekrarla"
                >
                  <i className="bi bi-arrow-repeat"></i>
                </Button>
                <Button
                  variant="success-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {}}
                  title="Sonuçları Görüntüle"
                >
                  <i className="bi bi-clipboard-data"></i>
                </Button>
              </div>
            );

          case "2": // İptal edildi
            return (
              <div className="d-flex gap-2 align-items-center">
                <Button
                  variant="info-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {
                    // Quiz verilerinden parametreleri çıkar ve ExamPractice'e git
                    const params = new URLSearchParams();
                    if (row.id) params.append('quiz_id', String(row.id));
                    if (row.level?.id) params.append('level_id', String(row.level.id));
                    if (row.level?.program?.id) params.append('program_id', String(row.level.program.id));
                    if (row.level?.program?.category?.id) params.append('category_id', String(row.level.program.category.id));
                    if (row.level?.program?.school_level) params.append('school_level', String(row.level.program.school_level));
                    
                    navigate(`/online-exam/exam-practice/${row.id}?${params.toString()}`);
                  }}
                  title="Görüntüle"
                >
                  <i className="bi bi-eye"></i>
                </Button>
                <Button
                  variant="warning-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() =>
                    navigate(`/online-exam/tabActive/crudAgain/${row.id}`)
                  }
                  title="Tekrarla"
                >
                  <i className="bi bi-arrow-repeat"></i>
                </Button>
              </div>
            );

          case "3": // İlerde yayınlanacak
            return (
              <div className="d-flex gap-2 align-items-center">
                <Button
                  variant="info-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {
                    // Quiz verilerinden parametreleri çıkar ve ExamPractice'e git
                    const params = new URLSearchParams();
                    if (row.id) params.append('quiz_id', String(row.id));
                    if (row.level?.id) params.append('level_id', String(row.level.id));
                    if (row.level?.program?.id) params.append('program_id', String(row.level.program.id));
                    if (row.level?.program?.category?.id) params.append('category_id', String(row.level.program.category.id));
                    if (row.level?.program?.school_level) params.append('school_level', String(row.level.program.school_level));
                    
                    navigate(`/online-exam/exam-practice/${row.id}?${params.toString()}`);
                  }}
                  title="Görüntüle"
                >
                  <i className="bi bi-eye"></i>
                </Button>
                <Button
                  variant="warning-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() =>
                    navigate(`/online-exam/tabActive/crudAgain/${row.id}`)
                  }
                  title="Tekrarla"
                >
                  <i className="bi bi-arrow-repeat"></i>
                </Button>
                <Button
                  variant="danger-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {}}
                  title="İptal Et"
                >
                  <i className="bi bi-x-circle"></i>
                </Button>
              </div>
            );

          default:
            return (
              <div className="d-flex gap-2 align-items-center">
                <Button
                  variant="info-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {
                    // Quiz verilerinden parametreleri çıkar ve ExamPractice'e git
                    const params = new URLSearchParams();
                    if (row.id) params.append('quiz_id', String(row.id));
                    if (row.level?.id) params.append('level_id', String(row.level.id));
                    if (row.level?.program?.id) params.append('program_id', String(row.level.program.id));
                    if (row.level?.program?.category?.id) params.append('category_id', String(row.level.program.category.id));
                    if (row.level?.program?.school_level) params.append('school_level', String(row.level.program.school_level));
                    
                    navigate(`/online-exam/exam-practice/${row.id}?${params.toString()}`);
                  }}
                  title="Görüntüle"
                >
                  <i className="bi bi-eye"></i>
                </Button>
                <Button
                  variant="warning-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() =>
                    navigate(`/online-exam/tabActive/crudAgain/${row.id}`)
                  }
                  title="Tekrarla"
                >
                  <i className="bi bi-arrow-repeat"></i>
                </Button>
              </div>
            );
        }
      },
    },
  ];
  
  return {
    columnsActiveExam: activeExam,
  };
}

export default activeExam;
