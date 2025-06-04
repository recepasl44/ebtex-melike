import React, { useState, useEffect } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import { WeeklyDutySchedule } from "../type.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
interface HeaderItem {
  title: string;
}
interface CustomHeaderItem extends HeaderItem {
  style?: {
    minWidth?: string;
    width?: string;
  };
}

interface WeeklyShiftScheduleTableProps {
  data: WeeklyDutySchedule[];
}

const WeeklyShiftScheduleTable: React.FC<WeeklyShiftScheduleTableProps> = ({
  data,
}) => {
  // Days of the week in Turkish
  const isDarkMode = useSelector(
    (state: RootState) => state.ui.dataThemeMode === "dark"
  );

  const daysOfWeek = [
    { key: "monday", label: "Pazartesi" },
    { key: "tuesday", label: "Salı" },
    { key: "wednesday", label: "Çarşamba" },
    { key: "Thursday", label: "Perşembe" },
    { key: "Friday", label: "Cuma" },
    { key: "Saturday", label: "Cumartesi" },
    { key: "sunday", label: "Pazar" },
  ];

  // State for active tabs and dynamic locations
  const [activeDay, setActiveDay] = useState<string>(daysOfWeek[0].key);
  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);
  const [activeLocation, setActiveLocation] = useState<string>("");

  // Extract unique locations from data
  useEffect(() => {
    if (data && data.length > 0) {
      // Get all unique places from all days
      const uniqueLocations = new Set<string>();

      data.forEach((item) => {
        for (const dayKey of daysOfWeek.map((d) => d.key)) {
          const dayData = item[dayKey as keyof typeof item];
          if (dayData && typeof dayData === "object" && "place" in dayData) {
            uniqueLocations.add(dayData.place);
          }
        }
      });

      // Create location objects
      const locationArray = Array.from(uniqueLocations).map((place) => ({
        id: place,
        name: place.charAt(0).toUpperCase() + place.slice(1), // Capitalize name
      }));

      setLocations(locationArray);

      // Set default active location
      if (locationArray.length > 0 && !activeLocation) {
        setActiveLocation(locationArray[0].id);
      }
    }
  }, [data]);

  // Get status color and class
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "raporlu":
        return "text-danger";
      case "aktif":
        return "text-primary";
      case "tamamlandı":
        return "text-success";
      case "etkinlikte":
        return "text-warning";
      case "yeri değişti":
        return "text-info";
      default:
        return "";
    }
  };

  // Get duty data for selected day and location
  const getDutyData = () => {
    if (!data || data.length === 0 || !activeDay || !activeLocation) {
      return [];
    }

    // Find the duty data for the selected day and location
    const dutyItems = [];
    
    for (const item of data) {
      const dayData = item[activeDay as keyof typeof item];
      if (
        dayData &&
        typeof dayData === "object" &&
        "place" in dayData &&
        dayData.place === activeLocation
      ) {
        dutyItems.push(dayData);
      }
    }

    return dutyItems;
  };
  
  // Fixed height container style 
  const containerStyle = {
    height: '360px',
    maxHeight: '370px',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden' // Hide overflow initially
  };
  
  // Table wrapper style - more aggressive containment
  const tableWrapperStyle = {
    width: '100%',
    overflowX: 'auto' as const,
    overflowY: 'auto' as const,
    flex: 1
  };

  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const dutyItems = getDutyData();
    
    // If less than 5 rows, add empty rows to maintain height
    if (dutyItems.length < 5) {
      const emptyRowsNeeded = 5 - dutyItems.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        dutyItems.push({
          teacher: '',
          hourse: '',
          task_place: '',
          status: '',
          place: ''
        } as any);
      }
    }
    
    return dutyItems;
  };

  // Define more conservative column widths to prevent overflow
  const columnWidths = {
    teacher: { width: "25%" },  // Changed to percentage-based widths
    hours: { width: "15%" },
    taskPlace: { width: "40%" },
    status: { width: "20%" }
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Haftalık Nöbet Çizelgesi</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          {/* Days of the week tabs */}
          <div className="px-3 pt-3">
            <Nav variant="pills" className="mb-3 d-flex flex-wrap">
              {daysOfWeek.map((day) => (
                <Nav.Item key={day.key} className="mb-2">
                  <Nav.Link
                    className={
                      activeDay === day.key ? "active py-1 px-2" : "py-1 px-2"
                    }
                    onClick={() => setActiveDay(day.key)}
                    style={{
                      borderRadius: "4px",
                      margin: "0 2px",
                      backgroundColor:
                        activeDay === day.key
                          ? isDarkMode
                            ? "#6259ca"
                            : "#e9dbff"
                          : isDarkMode
                          ? "#2c3034"
                          : "#f5f5fd",
                      color:
                        activeDay === day.key
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
                    {day.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>

          <div className="d-flex flex-column flex-md-row">
            {/* Left sidebar for locations */}
            <div
              style={{
                minWidth: "120px",
                maxWidth: "150px",
                borderRight: "1px solid #e9edf4",
                overflowY: "auto",
                maxHeight: "300px",
              }}
              className="w-100 w-md-auto"
            >
              <Nav className="flex-column">
                {locations.map((location) => (
                  <Nav.Item key={location.id}>
                    <Nav.Link
                      className={`px-4 py-2 text-truncate ${
                        activeLocation === location.id
                          ? "bg-light-purple text-primary"
                          : ""
                      }`}
                      onClick={() => setActiveLocation(location.id)}
                      style={{
                        borderRadius: "0",
                        borderLeft:
                          activeLocation === location.id
                            ? "3px solid #6259ca"
                            : "none",
                      }}
                      title={location.name}
                    >
                      {location.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>

            {/* Right content area with table */}
            <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
              <div className="p-3" style={containerStyle}>
                <h6 className="text-center mb-3">Nöbet Bilgileri</h6>
                
                {/* Improved scrollable table wrapper */}
                <div style={tableWrapperStyle}>
                  <SpkTablescomponent
                    tableClass="mb-0 table-fixed"
                    tBodyClass="table-group-divider"
                    header={
                      [
                        { title: "Öğretmen", style: columnWidths.teacher },
                        { title: "Saat", style: columnWidths.hours },
                        { title: "Görev Yeri", style: columnWidths.taskPlace },
                        { title: "Durum", style: columnWidths.status },
                      ] as CustomHeaderItem[]
                    }
                  >
                    {prepareTableData().map((dutyData, index) => {
                      // Check if this is an empty row
                      const isEmpty = !dutyData.teacher;
                      
                      return isEmpty ? (
                        <tr key={`empty-${index}`} style={{ height: '48px' }}>
                          <td colSpan={4}>&nbsp;</td>
                        </tr>
                      ) : (
                        <tr key={`duty-${index}`}>
                          <td className="text-truncate" title={dutyData.teacher}>
                            {dutyData.teacher}
                          </td>
                          <td className="text-truncate" title={dutyData.hourse}>
                            {dutyData.hourse}
                          </td>
                          <td className="text-truncate" title={dutyData.task_place}>
                            {dutyData.task_place}
                          </td>
                          <td className={`text-truncate ${getStatusClass(dutyData.status)}`} title={dutyData.status}>
                            {dutyData.status}
                          </td>
                        </tr>
                      );
                    })}
                  </SpkTablescomponent>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default WeeklyShiftScheduleTable;