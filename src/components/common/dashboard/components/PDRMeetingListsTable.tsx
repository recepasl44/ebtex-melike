import { Col, Card, Dropdown } from "react-bootstrap";
import { useState } from "react";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { PdrMeetingList } from "../type.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface PDRMeetingListsTableProps {
  data: PdrMeetingList[];
}

const PDRMeetingListsTable: React.FC<PDRMeetingListsTableProps> = ({
  data,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("Bugün");
  // Get dark mode state from Redux
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  // Fixed height container style
  const containerStyle = {
    height: "300px",
    maxHeight: "300px",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
  };

  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: "auto" as const,
    flex: 1,
    height: "100%",
  };

  // Function to determine status styling
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "görüşülmedi":
        return "text-danger";
      case "tamamlandı":
        return "text-success";
      case "bekliyor":
        return "text-warning";
      default:
        return "";
    }
  };

  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const meetingData = [...data];

    // Filter based on active filter
    const filteredData = meetingData.filter(() => {
      // Here you can add filtering logic based on activeFilter
      return true; // For now, return all data
    });

    // If less than 5 rows, add empty rows to maintain height
    if (filteredData.length < 5) {
      const emptyRowsNeeded = 5 - filteredData.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        filteredData.push({} as PdrMeetingList);
      }
    }

    return filteredData;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between d-flex align-items-center">
          <Card.Title>PDR Görüşme Listeleri</Card.Title>

          {/* Styled Dropdown matching StaffLeaveTrackingTableRow */}
          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              id="dropdown-period"
              className="d-flex align-items-center"
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#8E8CF5",
                backgroundColor: isDark ? "#252530" : "#f5f5f5",
                border: "none",
                borderRadius: "10px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              {activeFilter}
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                minWidth: "120px",
                padding: "0.5rem 0",
                margin: "0.125rem 0 0",
                fontSize: "13px",
                backgroundColor: isDark ? "#252530" : "#ffffff",
                border: isDark ? "none" : "1px solid rgba(0,0,0,0.15)",
                borderRadius: "8px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                color: isDark ? "#fff" : "#212529",
              }}
            >
              <Dropdown.Item
                active={activeFilter === "Bugün"}
                onClick={() => setActiveFilter("Bugün")}
                style={{
                  color:
                    activeFilter === "Bugün"
                      ? "#8E8CF5"
                      : isDark
                      ? "#fff"
                      : "#212529",
                  backgroundColor:
                    activeFilter === "Bugün"
                      ? "rgba(142, 140, 245, 0.1)"
                      : "transparent",
                  padding: "8px 16px",
                }}
              >
                Bugün
              </Dropdown.Item>
              <Dropdown.Item
                active={activeFilter === "Haftalık"}
                onClick={() => setActiveFilter("Haftalık")}
                style={{
                  color:
                    activeFilter === "Haftalık"
                      ? "#8E8CF5"
                      : isDark
                      ? "#fff"
                      : "#212529",
                  backgroundColor:
                    activeFilter === "Haftalık"
                      ? "rgba(142, 140, 245, 0.1)"
                      : "transparent",
                  padding: "8px 16px",
                }}
              >
                Haftalık
              </Dropdown.Item>
              <Dropdown.Item
                active={activeFilter === "Aylık"}
                onClick={() => setActiveFilter("Aylık")}
                style={{
                  color:
                    activeFilter === "Aylık"
                      ? "#8E8CF5"
                      : isDark
                      ? "#fff"
                      : "#212529",
                  backgroundColor:
                    activeFilter === "Aylık"
                      ? "rgba(142, 140, 245, 0.1)"
                      : "transparent",
                  padding: "8px 16px",
                }}
              >
                Aylık
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body className="p-3">
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Görüşme Türü" },
                  { title: "Tarih" },
                  { title: "Saat" },
                  { title: "Görüşme Süresi (dk)" },
                  { title: "Durum" },
                  { title: "Notlar" },
                ]}
              >
                {prepareTableData().map((meeting, index) => {
                  // Check if this is an empty row
                  const isEmpty = !meeting.meeting_type;

                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: "48px" }}>
                      <td colSpan={6}>&nbsp;</td>
                    </tr>
                  ) : (
                    <tr key={`meeting-${index}`}>
                      <td className="text-nowrap">{meeting.meeting_type}</td>
                      <td className="text-nowrap">{meeting.date}</td>
                      <td className="text-nowrap">{meeting.hourse}</td>
                      <td className="text-nowrap">{meeting.minute}</td>
                      <td className="text-nowrap">
                        <span className={getStatusStyle(meeting.status)}>
                          {meeting.status}
                        </span>
                      </td>
                      <td
                        className="text-truncate"
                        style={{ maxWidth: "200px" }}
                        title={meeting.description}
                      >
                        {meeting.description}
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

export default PDRMeetingListsTable;
