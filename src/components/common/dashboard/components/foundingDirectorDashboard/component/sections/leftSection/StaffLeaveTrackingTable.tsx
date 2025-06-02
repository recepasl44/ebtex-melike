import React from "react";
import { Card, Col } from "react-bootstrap";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";
import { StaffLeaveTrackingTable } from "../../../../../type";

interface StaffLeaveTrackingTableProps {
  staffLeaveTracking: StaffLeaveTrackingTable[];
}

const StaffLeaveTrackingTableRow: React.FC<StaffLeaveTrackingTableProps> = ({
  staffLeaveTracking,
}) => {

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

  return (
    <Col xxl={12} xl={12}>
    <Card className="custom-card">
      <Card.Header className="justify-content-between">
        <Card.Title>Personel İzin Takip Tablosu</Card.Title>
      </Card.Header>
      <Card.Body className="p-3">
        <div className="table-responsive">
          <SpkTablescomponent
            tableClass="text-wrap"
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
            {staffLeaveTracking.map((staff, index) => (
              <tr key={`staff-${index}`}>
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
              </tr>
            ))}
          </SpkTablescomponent>
        </div>
      </Card.Body>
    </Card>
    </Col>
  );
};

export default StaffLeaveTrackingTableRow;