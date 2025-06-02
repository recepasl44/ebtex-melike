import React, { useState, useEffect } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";
import { WeeklyDutySchedule } from "../../../../../type";

interface WeeklyShiftScheduleTableProps {
  data: WeeklyDutySchedule[];
}

const WeeklyShiftScheduleTable: React.FC<WeeklyShiftScheduleTableProps> = ({
  data,
}) => {
  const daysOfWeek = [
    { key: "monday", label: "Pazartesi" },
    { key: "tuesday", label: "Salı" },
    { key: "wednesday", label: "Çarşamba" },
    { key: "Thursday", label: "Perşembe" },
    { key: "Friday", label: "Cuma" },
    { key: "Saturday", label: "Cumartesi" },
    { key: "sunday", label: "Pazar" },
  ];

  const [activeDay, setActiveDay] = useState<string>(daysOfWeek[0].key);
  const [locations, setLocations] = useState<{ id: string; name: string }[]>([]);
  const [activeLocation, setActiveLocation] = useState<string>("");

  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueLocations = new Set<string>();

      data.forEach((item) => {
        for (const dayKey of daysOfWeek.map((d) => d.key)) {
          const dayData = item[dayKey as keyof typeof item];
          if (dayData && typeof dayData === "object" && "place" in dayData) {
            uniqueLocations.add(dayData.place);
          }
        }
      });

      const locationArray = Array.from(uniqueLocations).map((place) => ({
        id: place,
        name: place.charAt(0).toUpperCase() + place.slice(1),
      }));

      setLocations(locationArray);

      if (locationArray.length > 0 && !activeLocation) {
        setActiveLocation(locationArray[0].id);
      }
    }
  }, [data]);

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

  const getDutyData = () => {
    if (!data || data.length === 0 || !activeDay || !activeLocation) {
      return null;
    }

    for (const item of data) {
      const dayData = item[activeDay as keyof typeof item];
      if (
        dayData &&
        typeof dayData === "object" &&
        "place" in dayData &&
        dayData.place === activeLocation
      ) {
        return dayData;
      }
    }

    return null;
  };

  const currentDutyData = getDutyData();

    return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header>
          <Card.Title>Haftalık Nöbet Çizelgesi</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          {/* Days of the week tabs */}
          <div className="px-3 pt-3">
            <Nav variant="pills" className="mb-3">
              {daysOfWeek.map((day) => (
                <Nav.Item key={day.key}>
                  <Nav.Link
                    className={activeDay === day.key ? "active" : ""}
                    onClick={() => setActiveDay(day.key)}
                    style={{
                      borderRadius: "4px",
                      margin: "0 4px",
                      backgroundColor:
                        activeDay === day.key ? "#e9dbff" : "#f5f5fd",
                      color: activeDay === day.key ? "#6259ca" : "#333",
                      border: "none",
                    }}
                  >
                    {day.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>

          <div className="d-flex flex-column flex-md-row">
            <div className="location-nav" style={{ minWidth: "150px", borderRight: "1px solid #e9edf4" }}>
              <Nav className="flex-column">
                {locations.map((location) => (
                  <Nav.Item key={location.id}>
                    <Nav.Link
                      className={`px-4 py-2 ${
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
                    >
                      {location.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>

            <div className="flex-grow-1 overflow-hidden">
              <div className="p-3">
                <h6 className="text-center mb-3">Nöbet Bilgileri</h6>
                <div className="table-responsive">
                  <SpkTablescomponent
                    tableClass="table-bordered mb-0 w-100"
                    tBodyClass="table-group-divider"
                    header={[
                      { title: "Öğretmen" },
                      { title: "Saat" },
                      { title: "Görev Yeri" },
                      { title: "Durum" },
                    ]}
                  >
                    {currentDutyData ? (
                      <tr>
                        <td className="text-truncate">
                          {currentDutyData.teacher}
                        </td>
                        <td className="text-truncate">
                          {currentDutyData.hourse}
                        </td>
                        <td className="text-truncate">
                          {currentDutyData.task_place}
                        </td>
                        <td
                          className={`text-truncate ${getStatusClass(currentDutyData.status)}`}
                        >
                          {currentDutyData.status}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-3">
                          Bu konumda nöbet bilgisi bulunmamaktadır
                        </td>
                      </tr>
                    )}
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
