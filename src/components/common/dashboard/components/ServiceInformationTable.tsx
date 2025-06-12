import { Card, Col } from "react-bootstrap";
import { ServiceInformation } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface ServiceInformationTableProps {
    serviveInformation: ServiceInformation[];
}

const ServiceInformationTable: React.FC<ServiceInformationTableProps> = ({ serviveInformation }) => {
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between d-flex align-items-center">
          <Card.Title>Servis Bilgileri</Card.Title>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Başlık" },
                { title: "İçerik" },
              ]}
            >
              <tr>
                <td>Araç Plakası</td>
                <td>{serviveInformation[0].vehicle_plate}</td>
              </tr>
              <tr>
                <td>Şoför Adı</td>
                <td>{serviveInformation[0].driver}</td>
              </tr>
              <tr>
                <td>Koltuk Numarası</td>
                <td>{serviveInformation[0].number_of_seats}</td>
              </tr>
              <tr>
                <td>Sabah Saatleri</td>
                <td>Kalkış: {serviveInformation[0].morning_time}</td>
              </tr>
              <tr>
                <td>Akşam Saatleri</td>
                <td>Kalkış: {serviveInformation[0].night_time}</td>
              </tr>
              <tr>
                <td>Rota ve Duraklar</td>
                <td>{serviveInformation[0].route_and_stops}</td>
              </tr>
              <tr>
                <td>Servis Konumu</td>
                <td>{serviveInformation[0].service_place}</td>
              </tr>
              <tr>
                <td>Bildirimler</td>
                <td>{serviveInformation[0].notification || "Bildirim bulunmamaktadır"}</td>
              </tr>
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ServiceInformationTable
