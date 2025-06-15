import React, { useState } from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";
import { StaffLeaveTrackingTable } from "../type.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface StaffLeaveTrackingTableProps {
  staffLeaveTracking: StaffLeaveTrackingTable[];
}

const StaffLeaveTrackingTableRow: React.FC<StaffLeaveTrackingTableProps> = ({
  staffLeaveTracking = [],
}) => {
  // Period filter state
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');
  const localVariable = useSelector((state: RootState) => state.ui);
  const isDark = localVariable.dataThemeMode === "dark";

  // Period display text mapping
  const periodText = {
    today: "Bugün",
    week: "Bu Hafta",
    month: "Bu Ay"
  };

  // Status color mapping function
  const getStatusColorClass = (status: string) => {
    status = status.toLowerCase();
    switch (status) {
      case "onaylı":
        return "success";
      case "mazeretsiz":
        return "secondary";
      case "mazeretli":
        return "info";
      case "tamamlandı":
        return "purple";
      case "iptal edildi":
        return "danger";
      case "beklemede":
        return "warning";
      default:
        return "primary";
    }
  };
  
  // Fixed height table container style
  const tableContainerStyle = {
    height: '450px', 
    maxHeight: '400px', 
    overflow: 'hidden', 
    display: 'flex',
    flexDirection: 'column' as const
  };
  
  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: 'auto' as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: '100%' // Fill the container
  };
  
  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const data = Array.isArray(staffLeaveTracking)
      ? [...staffLeaveTracking]
      : [];
    
    // If less than 5 rows, add empty rows to maintain height
    if (data.length < 5) {
      const emptyRowsNeeded = 5 - data.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        data.push({} as StaffLeaveTrackingTable);
      }
    }
    
    return data;
  };

  return (
    <Col xxl={12} xl={12}>
    <Card className="custom-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title>Personel İzin Takip Tablosu</Card.Title>

        <Dropdown align="end">
          <Dropdown.Toggle
            as="div"
            id="dropdown-period"
            className="d-flex align-items-center"
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#8E8CF5',
              backgroundColor: isDark ? '#252530' : '#f5f5f5',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              cursor: 'pointer'
            }}
          >
            {periodText[selectedPeriod]}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{
            minWidth: '120px',
            padding: '0.5rem 0',
            margin: '0.125rem 0 0',
            fontSize: '13px',
            backgroundColor: isDark ? '#252530' : '#ffffff',
            border: isDark ? 'none' : '1px solid rgba(0,0,0,0.15)',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            color: isDark ? '#fff' : '#212529'
          }}>
            <Dropdown.Item
              active={selectedPeriod === 'today'}
              onClick={() => setSelectedPeriod('today')}
              style={{
                color: selectedPeriod === 'today' ? '#8E8CF5' : isDark ? '#fff' : '#212529',
                backgroundColor: selectedPeriod === 'today' ? 'rgba(142, 140, 245, 0.1)' : 'transparent',
                padding: '8px 16px'
              }}
            >
              Bugün
            </Dropdown.Item>
            <Dropdown.Item
              active={selectedPeriod === 'week'}
              onClick={() => setSelectedPeriod('week')}
              style={{
                color: selectedPeriod === 'week' ? '#8E8CF5' : isDark ? '#fff' : '#212529',
                backgroundColor: selectedPeriod === 'week' ? 'rgba(142, 140, 245, 0.1)' : 'transparent',
                padding: '8px 16px'
              }}
            >
              Bu Hafta
            </Dropdown.Item>
            <Dropdown.Item
              active={selectedPeriod === 'month'}
              onClick={() => setSelectedPeriod('month')}
              style={{
                color: selectedPeriod === 'month' ? '#8E8CF5' : isDark ? '#fff' : '#212529',
                backgroundColor: selectedPeriod === 'month' ? 'rgba(142, 140, 245, 0.1)' : 'transparent',
                padding: '8px 16px'
              }}
            >
              Bu Ay
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Body className="p-3">
        {/* Fixed height table container with vertical scroll */}
        <div className="table-responsive" style={tableContainerStyle}>
          <div style={scrollContainerStyle}>
            <SpkTablescomponent
              tableClass="text-wrap table-fixed"
              tBodyClass="table-group-divider"
              header={[
                { title: "Adı Soyadı" },
                { title: "Görev" },
                { title: "İzin Türü" },
                { title: "Süre (Gün)" },
                { title: "Durum" },
                { title: "Başlangıç Tarihi" },
              ]}
            >
              {prepareTableData().map((staff, index) => {
                // Check if this is an empty row
                const isEmpty = !staff.name_surname;
                
                return (
                  <tr key={`staff-${index}`} style={isEmpty ? { height: '48px' } : {}}>
                    {isEmpty ? (
                      <td colSpan={6}>&nbsp;</td>
                    ) : (
                      <>
                        <td className="text-truncate" style={{ maxWidth: "150px" }}>
                          {staff.name_surname}
                        </td>
                        <td className="text-nowrap">{staff.task}</td>
                        <td className="text-nowrap">{staff.permission_type}</td>
                        <td className="text-nowrap">{staff.time}</td>
                        <td className="text-nowrap">
                          <span
                            className={`badge bg-${getStatusColorClass(staff.status)}-transparent text-${getStatusColorClass(staff.status)}`}
                            style={{ padding: "6px 12px" }}
                          >
                            {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                          </span>
                        </td>
                        <td className="text-nowrap">{staff.start_date}</td>
                      </>
                    )}
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

export default StaffLeaveTrackingTableRow;