import { Card, Col } from "react-bootstrap";
import { Status } from "../../../../../type";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface ServicesStatusTableProps {
    data: Status[];
}

const ServicesStatusTable: React.FC<ServicesStatusTableProps> = ({ data }) => {
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Servis Durumu</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Plaka" },
                { title: "Rota" },
                { title: "Konum" },
                { title: "Eksik Öğrenci" },
                { title: "Tahmini Varış" },
              ]}
            >
              {data.map((service, index) => (
                <tr key={`service-${index}`}>
                  <td className="text-nowrap">{service.plate}</td>
                  <td className="text-nowrap">{service.route}</td>
                  <td className="text-nowrap">{service.location}</td>
                  <td className="text-nowrap">{service.missing_student}</td>
                  <td className="text-nowrap">{service.estimated_arrival}</td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ServicesStatusTable;