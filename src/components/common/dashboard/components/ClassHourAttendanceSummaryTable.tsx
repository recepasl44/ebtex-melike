import React, { useState } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { ClassHourAttendanceSummary } from "../type.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface ClassHourAttendanceSummaryTableProps {
  data: ClassHourAttendanceSummary[];
}

const ClassHourAttendanceSummaryTable: React.FC<
  ClassHourAttendanceSummaryTableProps
> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Ortaokul");

  // Get dark mode state from Redux store
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );

  const schoolLevels = ["Anaokul", "İlkokul", "Ortaokul", "Lise"];

  // Fixed height container style
  const containerStyle = {
    height: "300px", // Fixed height for 5 rows + header
    maxHeight: "300px", // Ensure it doesn't expand
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden", // Hide overflow initially
  };

  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: "auto" as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: "100%", // Fill the container
  };

  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const filteredData = data.filter(() => {
      // Filter by school level - in a real app, you'd have level property
      // This is just a placeholder, adjust according to your actual data structure
      return true; // For now, return all data
    });

    // If less than 5 rows, add empty rows to maintain height
    if (filteredData.length < 5) {
      const emptyRowsNeeded = 5 - filteredData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        filteredData.push({} as ClassHourAttendanceSummary);
      }
    }

    return filteredData;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Ders Saati Yoklama Özeti</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          {/* School Level Tabs - updated to match DailyCourseScheduleTable styling */}
          <Nav variant="pills" className="mb-3">
            {schoolLevels.map((level) => (
              <Nav.Item key={level} className="mb-2">
                <Nav.Link
                  className={
                    activeTab === level ? "active py-1 px-2" : "py-1 px-2"
                  }
                  onClick={() => setActiveTab(level)}
                  style={{
                    borderRadius: "4px",
                    margin: "0 2px",
                    backgroundColor:
                      activeTab === level
                        ? isDarkMode
                          ? "#6259ca"
                          : "#e9dbff"
                        : isDarkMode
                        ? "#2c3034"
                        : "#f5f5fd",
                    color:
                      activeTab === level
                        ? isDarkMode
                          ? "#fff"
                          : "#6259ca"
                        : isDarkMode
                        ? "#adb5bd"
                        : "#333",
                    border: isDarkMode ? "1px solid #495057" : "none",
                    fontSize: "0.75rem",
                  }}
                >
                  {level}
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
                  { title: "Sınıf" },
                  { title: "Toplam Öğrenci" },
                  { title: "Gelmeyenler" },
                  { title: "Geç Gelenler" },
                  { title: "Detaylar" },
                ]}
              >
                {prepareTableData().map((item, index) => {
                  // Check if this is an empty row
                  const isEmpty = !item.name;

                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: "48px" }}>
                      <td colSpan={5}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`attendance-${index}`}>
                      <td className="text-nowrap">{item.name}</td>
                      <td className="text-nowrap">{item.total_student}</td>
                      <td className="text-nowrap">{item["not _come"]}</td>
                      <td className="text-nowrap">{item.arrivals}</td>
                      <td className="text-center">
                        <button
                          className="btn rounded-circle"
                          style={{
                            backgroundColor: "#f0f6ff",
                            width: "40px",
                            height: "40px",
                            padding: "0",
                          }}
                        >
                          <i
                            className="bi bi-eye"
                            style={{ color: "#0d6efd" }}
                          />
                        </button>
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

export default ClassHourAttendanceSummaryTable;
