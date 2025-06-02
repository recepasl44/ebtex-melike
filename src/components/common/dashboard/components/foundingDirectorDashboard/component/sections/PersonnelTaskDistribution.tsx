import React from "react";
import { Card, Col } from "react-bootstrap";
import { StaffTaskDistributionTable } from "../../../../type";
import SpkTablescomponent from "../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface PresonelTaskDistributionProps {
    personnelTaskDistribution: StaffTaskDistributionTable[]
}

const PersonnelTaskDistribution: React.FC<PresonelTaskDistributionProps> = ({
  personnelTaskDistribution,
}) => {
  console.log("personnelTaskDistribution", personnelTaskDistribution);
  
  const getStatusColorClass = (status: string) => {
    status = status.toLowerCase();
    switch (status) {
      case "tamamlandı":
        return "danger";
      case "devam ediyor":
        return "success";
      case "görev durumu":
        return "primary";
      default:
        return "primary";
    }
  };

  return (
    <Col xxl={12} xl={12}>
    <Card className="custom-card">
      <Card.Header className="justify-content-between">
        <Card.Title>Personel Görev Dağılımı</Card.Title>
      </Card.Header>
      <Card.Body className="p-3">
        <div className="table-responsive">
          <SpkTablescomponent
            tableClass="text-wrap table-nowrap"
            tBodyClass="table-group-divider"
            header={[
              { title: "Görev Kategorisi" },
              { title: "Adı Soyadı" },
              { title: "Görev Tarih ve Saati" },
              { title: "Görev Yeri" },
              { title: "Görev Durumu" },
              { title: "İletişim Bilgisi" },
              { title: "Açıklamalar" },
            ]}
          >
            {personnelTaskDistribution.map((item, index) => (
              <tr key={`task-${index}`}>
                <td className="text-nowrap">{item.task_categories}</td>
                <td className="text-nowrap">{item.name}</td>
                <td className="text-nowrap">{item.mission_time}</td>
                <td className="text-nowrap">{item.task_place}</td>
                <td className="text-nowrap">
                  <span
                    className={`text-${getStatusColorClass(item.task_status)}-transparent text-${getStatusColorClass(item.task_status)}`}
                    style={{ padding: "6px 12px" }}
                  >
                    {item.task_status.charAt(0).toUpperCase() + item.task_status.slice(1)}
                  </span>
                </td>
                <td className="text-nowrap">{item.contact_information}</td>
                <td className="text-wrap" style={{ maxWidth: "250px" }}>{item.description}</td>
              </tr>
            ))}
          </SpkTablescomponent>
        </div>
      </Card.Body>
    </Card>
    </Col>
  );
};

export default PersonnelTaskDistribution;