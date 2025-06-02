import { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { ExamCountdownItem } from "../../../../../type";

interface ExamCountdownProps {
  examCountdown: ExamCountdownItem[];
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ExamCountdown: React.FC<ExamCountdownProps> = ({ examCountdown }) => {
  const [activeTab, setActiveTab] = useState<string>(
    examCountdown[0]?.name || ""
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    if (!activeTab) return;

    const selectedExam = examCountdown.find((exam) => exam.name === activeTab);
    if (!selectedExam) return;

    const examDate = new Date(selectedExam.date);
    const now = new Date();
    const difference = examDate.getTime() - now.getTime();

    if (difference <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    });
  };

  useEffect(() => {
    calculateTimeLeft();
  }, [activeTab, examCountdown]);

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, examCountdown]);

  return (
    <Col xxl={12} xl={12} lg={12}>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Sınav Geri Sayımı</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="exam-tabs">
            <div className="d-flex">
              {examCountdown.map((exam, index) => (
                <div
                  key={exam.name}
                  className={`exam-tab ${
                    activeTab === exam.name ? "active" : ""
                  }`}
                  style={{
                    flex: 1,
                    padding: "15px 20px",
                    textAlign: "center",
                    backgroundColor:
                      activeTab === exam.name ? "#5C67F7" : "#f0f0f5",
                    color: activeTab === exam.name ? "white" : "#333",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: "22px",
                    borderRadius:
                      index === 0
                        ? "10px 0 0 0"
                        : index === examCountdown.length - 1
                        ? "0 0 10px 0"
                        : "0",
                  }}
                  onClick={() => setActiveTab(exam.name)}
                >
                  {exam.name.toUpperCase()} {new Date(exam.date).getFullYear()}
                </div>
              ))}
            </div>
          </div>

          <div className="countdown-container text-center p-2">
            <div className="d-flex justify-content-around">
              <div className="text-center">
                <div
                  className="fs-1 fw-bold  mb-1"
                  style={{ fontSize: "15px" }}
                >
                  {timeLeft.days}
                </div>
                <div className="text-muted" style={{ fontSize: "14px" }}>
                  Gün
                </div>
              </div>
              <div className="text-center">
                <div
                  className="fs-1 fw-bold  mb-1"
                  style={{ fontSize: "15px" }}
                >
                  {timeLeft.hours}
                </div>
                <div className="text-muted" style={{ fontSize: "14px" }}>
                  Saat
                </div>
              </div>
              <div className="text-center">
                <div
                  className="fs-1 fw-bold  mb-1"
                  style={{ fontSize: "15px" }}
                >
                  {timeLeft.minutes}
                </div>
                <div className="text-muted" style={{ fontSize: "14px" }}>
                  Dakika
                </div>
              </div>
              <div className="text-center">
                <div className="fs-1 fw-bold  mb-1" style={{ fontSize: "15x" }}>
                  {timeLeft.seconds}
                </div>
                <div className="text-muted" style={{ fontSize: "14px" }}>
                  Saniye
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ExamCountdown;
