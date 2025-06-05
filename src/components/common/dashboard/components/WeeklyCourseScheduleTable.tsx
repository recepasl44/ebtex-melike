import React, { useState } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { WeeklyLessonProgram } from "../type.ts";

interface WeeklyCourseScheduleTableProps {
  data: WeeklyLessonProgram[];
}

const WeeklyCourseScheduleTable: React.FC<WeeklyCourseScheduleTableProps> = ({ data }) => {
  const [activeDay, setActiveDay] = useState<string>("monday");

  // Fixed height container style
  const containerStyle = {
    height: '300px', // Fixed height for 5 rows + header
    maxHeight: '300px', // Ensure it doesn't expand
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden' // Hide overflow initially
  };
  
  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: 'auto' as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: '100%' // Fill the container
  };

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

    // Transform data to display format
    return dayData.map(lesson => ({
      lesson_no: lesson?.lesson_no || "",
      hour: lesson?.hour || "",
      lesson: lesson?.lesson || "",
      teacher: lesson?.teacher || "",
      attendance_status: lesson?.attendance_status || ""
    })).filter(lesson => lesson.lesson_no !== ""); // Filter out empty lessons
  };

  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const lessonData = getLessonsForDay(activeDay);
    
    // If less than 5 rows, add empty rows to maintain height
    if (lessonData.length < 5) {
      const emptyRowsNeeded = 5 - lessonData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        lessonData.push({
          lesson_no: "",
          hour: "",
          lesson: "",
          teacher: "",
          attendance_status: ""
        });
      }
    }
    
    return lessonData;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Haftalık Ders Programı</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Day selection tabs */}
          <Nav variant="tabs" className="mb-2 border-bottom-0" defaultActiveKey="monday">
            {Object.entries(dayMapping).map(([key, value]) => (
              <Nav.Item key={key}>
                <Nav.Link
                  eventKey={key}
                  active={activeDay === key}
                  onClick={() => setActiveDay(key)}
                  className="px-3 py-1"
                >
                  {value}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Ders No" },
                  { title: "Saat" },
                  { title: "Ders" },
                  { title: "Öğretmen Adı" },
                  { title: "Yoklama Durumu" },
                ]}
              >
                {prepareTableData().map((lesson, index) => {
                  // Check if this is an empty row
                  const isEmpty = !lesson.lesson_no;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={5}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`lesson-${index}`}>
                      <td className="text-nowrap">{lesson.lesson_no}</td>
                      <td className="text-nowrap">{lesson.hour}</td>
                      <td className="text-truncate" style={{ maxWidth: "150px" }} title={lesson.lesson}>
                        {lesson.lesson}
                      </td>
                      <td className="text-nowrap">{lesson.teacher}</td>
                      <td className={`text-nowrap ${getStatusColor(lesson.attendance_status)}`}>
                        {mapAttendanceStatus(lesson.attendance_status)}
                      </td>
                    </tr>
                  );
                })}
              </SpkTablescomponent>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default WeeklyCourseScheduleTable;