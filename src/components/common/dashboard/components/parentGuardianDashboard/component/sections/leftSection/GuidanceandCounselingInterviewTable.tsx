import React from "react";
import { Card, Col } from "react-bootstrap";
import { GuidanceCounselingInterviewTable } from "../../../../../type";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface GuidanceandCounselingInterviewTableProps {
  data: GuidanceCounselingInterviewTable;
}

const GuidanceandCounselingInterviewTable: React.FC<GuidanceandCounselingInterviewTableProps> = ({ data }) => {
  const getStatusColor = (status: string): string => {
    switch(status.toLowerCase()) {
      case "bekliyor":
      case "bekleniyor":
        return "text-warning";
      case "tamamlandı":
        return "text-success";
      case "görüşülmedi":
        return "text-danger";
      default:
        return "";
    }
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Rehberlik ve Danışmanlık Görüşme Tablosu</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Görüşülen" },
                { title: "Görüşme Tarihi" },
                { title: "Görüşme Saati" },
                { title: "Durum" },
                { title: "Notlar" },
              ]}
            >
              <tr>
                <td>{data.discussed}</td>
                <td>{data.meeting_time}</td>
                <td>{data.meeting_hour}</td>
                <td className={getStatusColor(data.status)}>
                  {data.status}
                </td>
                <td>{data.notes}</td>
              </tr>
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default GuidanceandCounselingInterviewTable;