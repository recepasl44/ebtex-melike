import { Card, Col } from "react-bootstrap";
import { ServicePaymentInformation } from "../../../../../type"
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface ServicePaymentinformationTableProps {
    servicePaymentinformation: ServicePaymentInformation[]
}

const ServicePaymentinformationTable: React.FC<ServicePaymentinformationTableProps> = ({
  servicePaymentinformation
}) => {
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Servis Ödeme Bilgileri</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Plakası" },
                { title: "Grup Adı" },
                { title: "Yolcu Kapasitesi" },
                { title: "Yolcu Sayısı" },
                { title: "Gelir Toplamı" },
                { title: "Ödenen" },
                { title: "Kalan" }
              ]}
            >
              {servicePaymentinformation.map((payment, index) => (
                <tr key={`payment-${index}`}>
                  <td className="text-nowrap">{payment.service_plate}</td>
                  <td className="text-nowrap">{payment.group_name}</td>
                  <td className="text-nowrap">{payment.passenger_capacity}</td>
                  <td className="text-nowrap">{payment.number_of_passengers}</td>
                  <td className="text-nowrap">{payment.total_income}</td>
                  <td className="text-nowrap">{payment.paid}</td>
                  <td className="text-nowrap">{payment.remainder}</td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ServicePaymentinformationTable