import React, { useState } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";
import { WeeklyLessonProgram } from "../../../../../type";

interface WeeklyCourseScheduleTableProps {
  data: WeeklyLessonProgram[];
}

const WeeklyCourseScheduleTable: React.FC<WeeklyCourseScheduleTableProps> = ({ data }) => {
  const [activeDay, setActiveDay] = useState<string>("monday");
  
  // Day mapping for display purposes
  const dayMapping = {
    monday: "Pazartesi",
    tuesday: "Salı",
    wednesday: "Çarşamba",
    Thursday: "Perşembe",
    Friday: "Cuma",
    Saturday: "Cumartesi",
    sunday: "Pazar"
  };

  // Map API status to display status
  const mapAttendanceStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "alındı":
        return "Geldi";
      case "alınmadı":
        return "Gelmedi";
      case "geç alındı":
        return "Geç Geldi";
      default:
        return status;
    }
  };

  // Get status color based on attendance status
  const getStatusColor = (status: string) => {
    const mappedStatus = mapAttendanceStatus(status);
    switch (mappedStatus) {
      case "Geldi":
        return "text-success";
      case "Gelmedi":
        return "text-danger";
      case "Geç Geldi":
        return "text-warning";
      default:
        return "";
    }
  };

  // Get lessons for the active day from actual data
  const getLessonsForDay = (day: string) => {
    if (!data || data.length === 0) return [];
    
    // Find lessons for the selected day
    const dayData = data.map(weekProgram => weekProgram[day as keyof WeeklyLessonProgram]);
    
    // Transform data to display format - display hour exactly as it is in the data
    return dayData.map(lesson => ({
      lesson_no: lesson?.lesson_no || "",
      hour: lesson?.hour || "",  // Use hour directly without transformation
      lesson: lesson?.lesson || "",
      teacher: lesson?.teacher || "",
      attendance_status: lesson?.attendance_status || ""
    })).filter(lesson => lesson.lesson_no !== ""); // Filter out empty lessons
  };

  // Current day's lessons
  const currentDayLessons = getLessonsForDay(activeDay);

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Haftalık Ders Programı</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          {/* Day selection tabs */}
          <Nav variant="tabs" className="px-3 pt-2 border-bottom-0" defaultActiveKey="monday">
            {Object.entries(dayMapping).map(([key, value]) => (
              <Nav.Item key={key}>
                <Nav.Link 
                  eventKey={key} 
                  active={activeDay === key}
                  onClick={() => setActiveDay(key)}
                  className="px-3 py-2"
                >
                  {value}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          
          {/* Lessons table */}
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap mb-0"
              tBodyClass="table-group-divider"
              header={[
                { title: "Ders No" },
                { title: "Saat" },
                { title: "Ders" },
                { title: "Öğretmen Adı" },
                { title: "Yoklama Durumu" },
              ]}
            >
              {currentDayLessons.length > 0 ? (
                currentDayLessons.map((lesson, index) => (
                  <tr key={`lesson-${index}`}>
                    <td>{lesson.lesson_no}</td>
                    <td>{lesson.hour}</td>
                    <td>{lesson.lesson}</td>
                    <td>{lesson.teacher}</td>
                    <td className={getStatusColor(lesson.attendance_status)}>
                      {mapAttendanceStatus(lesson.attendance_status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">Bu gün için ders programı bulunmamaktadır.</td>
                </tr>
              )}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default WeeklyCourseScheduleTable;