import { Card, Col } from "react-bootstrap";
import { StaffTaskDistributionTable } from "../../../../../type";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface SupportStaffTaskDistributionTableProps {
    data : StaffTaskDistributionTable[];
}
const SupportStaffTaskDistributionTable: React.FC<SupportStaffTaskDistributionTableProps> = ({
  data,
}) => {
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Destek Personeli Görev Tablosu</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Görev Kategorisi" },
                { title: "Adı ve Soyadı" },
                { title: "Görev Tarihi ve Saati" },
                { title: "Görev Yeri" },
                { title: "Görev Durumu" },
                { title: "Açıklamalar" }
              ]}
            >
              {data.map((item, index) => (
                <tr key={`task-${index}`}>
                  <td className="text-nowrap">{item.task_categories}</td>
                  <td className="text-nowrap">{item.name}</td>
                  <td className="text-nowrap">{item.mission_time}</td>
                  <td className="text-nowrap">{item.task_place}</td>
                  <td className="text-nowrap">{item.task_status}</td>
                  <td className="text-nowrap">{item.description}</td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default SupportStaffTaskDistributionTable