import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ColumnDefinition } from "../../ReusableTable";
import { QuizStudentData } from "../../../../types/quizstudents/list";

export default function onlineExam(_params?: any) {
  const navigate = useNavigate();

  // Student exam status mapping
  const examStatusLabels: Record<string, string> = {
    "0": "Aktif",
    "1": "Ayrıldı",
    "2": "Bağlantı Koptu",
    "3": "Tamamlandı",
  };

  // Define the columns for the student exam table
  const onlineExam: ColumnDefinition<QuizStudentData>[] = [
    {
      key: "student.name",
      label: "Öğrenci Adı",
      render: (row: any) => {
        return row.student ? `${row.student.first_name} ${row.student.last_name}` : "-";
      },
    },
    {
      key: "student.level.name",
      label: "Sınıf",
      render: (row: any) => {
        return row.student?.level?.name || "-";
      },
    },
    {
      key: "exam_status",
      label: "Durumu",
      render: (row: any) => {
        // This field needs to be added by backend
        return row.exam_status ? examStatusLabels[row.exam_status] || row.exam_status : "Aktif";
      },
    },
    {
      key: "exam_start_time",
      label: "Sınav Başlangıç Saati",
      render: (row: any) => {
        // This field needs to be added by backend
        return row.exam_start_time || 
          (row.quiz?.quiz_date ? new Date(row.quiz.quiz_date).toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
          }) : "-");
      },
    },
    {
      key: "last_action_time",
      label: "Son İşlem Zamanı",
      render: (row: any) => {
        // This field needs to be added by backend
        return row.last_action_time || "-";
      },
    },
    {
      key: "last_answered_question",
      label: "Son Cevaplanan Soru",
      render: (row: any) => {
        // This field needs to be added by backend
        return row.last_answered_question || "-";
      },
    },
    {
      key: "remaining_time",
      label: "Kalan Süre",
      render: (row: any) => {
        // This field needs to be added by backend
        return row.remaining_time || "-";
      },
    },
    {
      key: "quiz_results",
      label: "D/Y/B",
      render: (row: any) => {
        // These fields need to be added by backend
        return row.correct_answers && row.wrong_answers && row.blank_answers 
          ? `${row.correct_answers}/${row.wrong_answers}/${row.blank_answers}`
          : "-";
      },
    },
    {
      key: "actions",
      label: "İşlem",
      render: (row: any) => {
        const examStatus = row.exam_status || "Aktif"; 

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

        switch (examStatus) {
          case "Aktif":
            return (
              <div className="d-flex gap-2 align-items-center">
                <Button
                  variant="info-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => navigate(`/online-exam/practice?id=${row.id}`)}
                  title="İzle"
                >
                  <i className="bi bi-eye"></i>
                </Button>
                <Button
                  variant="danger-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {}}
                  title="Müdahale Et"
                >
                  <i className="bi bi-tools"></i>
                </Button>
              </div>
            );

          case "Ayrıldı":
          case "Bağlantı Koptu":
            return (
              <div className="d-flex gap-2 align-items-center">
                <Button
                  variant="info-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => navigate(`/online-exam/practice?id=${row.id}`)}
                  title="İzle"
                >
                  <i className="bi bi-eye"></i>
                </Button>
                <Button
                  variant="success-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => {}}
                  title="Tekrar Başlat"
                >
                  <i className="bi bi-arrow-repeat"></i>
                </Button>
              </div>
            );

          case "Tamamlandı":
            return (
              <div className="d-flex gap-2 align-items-center">
                <Button
                  variant="info-light"
                  size="sm"
                  style={buttonStyle}
                  onClick={() => navigate(`/online-exam/practice?id=${row.id}`)}
                  title="İzle"
                >
                  <i className="bi bi-eye"></i>
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
                  onClick={() => navigate(`/online-exam/practice?id=${row.id}`)}
                  title="İzle"
                >
                  <i className="bi bi-eye"></i>
                </Button>
              </div>
            );
        }
      },
    },
  ];
  return {
    columnsOnlineExam: onlineExam,
  };
}