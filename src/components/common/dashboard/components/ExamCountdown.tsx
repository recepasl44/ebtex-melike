import { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { ExamCountdownItem } from "../type.ts";

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

  const timeUnitStyles = {
    days: { background: "#F0F0FF", color: "#6970F8" },
    hours: { background: "#F8F0FF", color: "#B36EE0" },
    minutes: { background: "#FFF0F5", color: "#E86B9A" },
    seconds: { background: "#FFF6F0", color: "#F28E64" },
  };

  return (
    <Col xxl={12} xl={12} lg={12}>
      <Card className="custom-card" style={{ height: "100%" }}>
        <Card.Header>
          <Card.Title>Sınav Geri Sayımı</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="exam-tabs p-3" style={{ height: "60px" }}>
            <div className="d-flex gap-2">
              {examCountdown.map((exam) => (
                <button
                  key={exam.name}
                  className={`btn ${
                    activeTab === exam.name ? "" : "btn-outline"
                  }`}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 500,
                    backgroundColor:
                      activeTab === exam.name ? "#6370F4" : "transparent",
                    color: activeTab === exam.name ? "white" : "#6370F4",
                    border:
                      activeTab === exam.name ? "none" : "2px solid #6370F4",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    height: "44px",
                    minWidth: "120px",
                    flexShrink: 0,
                  }}
                  onClick={() => setActiveTab(exam.name)}
                >
                  {exam.name.toUpperCase()} {new Date(exam.date).getFullYear()}
                </button>
              ))}
            </div>
          </div>

          <div
            className="countdown-container text-center p-4"
            style={{ height: "180px" }}
          >
            <div className="d-flex justify-content-between">
              {/* Days */}
              <div className="text-center" style={{ width: "60px" }}>
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: timeUnitStyles.days.background,
                  }}
                >
                  <div
                    className="fw-bold"
                    style={{
                      fontSize: "32px",
                      color: timeUnitStyles.days.color,
                      minWidth: "40px",
                      textAlign: "center",
                    }}
                  >
                    {timeLeft.days}
                  </div>
                </div>
                <div className="text-uppercase mt-2 fw-bold">Gün</div>
              </div>

              {/* Hours */}
              <div className="text-center" style={{ width: "70px" }}>
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: timeUnitStyles.hours.background,
                  }}
                >
                  <div
                    className="fw-bold"
                    style={{
                      fontSize: "32px",
                      color: timeUnitStyles.hours.color,
                      minWidth: "40px",
                      textAlign: "center",
                    }}
                  >
                    {timeLeft.hours}
                  </div>
                </div>
                <div className="text-uppercase mt-2 fw-bold">Saat</div>
              </div>

              {/* Minutes */}
              <div className="text-center" style={{ width: "70px" }}>
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: timeUnitStyles.minutes.background,
                  }}
                >
                  <div
                    className="fw-bold"
                    style={{
                      fontSize: "32px",
                      color: timeUnitStyles.minutes.color,
                      minWidth: "40px",
                      textAlign: "center",
                    }}
                  >
                    {timeLeft.minutes}
                  </div>
                </div>
                <div className="text-uppercase mt-2 fw-bold">Dakika</div>
              </div>

              {/* Seconds */}
              <div className="text-center" style={{ width: "70px" }}>
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: timeUnitStyles.seconds.background,
                  }}
                >
                  <div
                    className="fw-bold"
                    style={{
                      fontSize: "32px",
                      color: timeUnitStyles.seconds.color,
                      minWidth: "40px",
                      textAlign: "center",
                    }}
                  >
                    {timeLeft.seconds}
                  </div>
                </div>
                <div className="text-uppercase mt-2 fw-bold">Saniye</div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ExamCountdown;
