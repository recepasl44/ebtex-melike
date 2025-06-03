import { Card, Col } from "react-bootstrap";
import { Status2 } from "../../../../../type";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface ServicePaymentStatusTableProps {
  servicePaymentStatus: Status2[];
}

const ServicePaymentStatusTable: React.FC<ServicePaymentStatusTableProps> = ({ servicePaymentStatus }) => {
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Servis Ödeme Durumu</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Adı Soyadı" },
                { title: "Yıllık Ücret" },
                { title: "Ödenen" },
                { title: "Kalan" },
                { title: "Durum" },
                { title: "Detay" },
              ]}
            >
              {servicePaymentStatus.map((payment, index) => (
                <tr key={`payment-${index}`}>
                  <td className="text-nowrap">{payment.name}</td>
                  <td className="text-nowrap">₺{payment.yearly_price}</td>
                  <td className="text-nowrap">₺{payment.paid}</td>
                  <td className="text-nowrap">₺{payment.remainder}</td>
                  <td className="text-nowrap">{payment.status === "ödendi" ? "Bekleniyor" : payment.status}</td>
                  <td className="text-nowrap">
                    <a href="#" className="text-primary">
                      [Detay Gör]
                    </a>
                  </td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ServicePaymentStatusTable;