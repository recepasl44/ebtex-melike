import { Card, Col } from "react-bootstrap";
import { ServiceVehicleInformation } from "../../../../../type"
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface ServiceVehicleInformationTableProps {
    serviceVehicleInformation: ServiceVehicleInformation[]
}

const ServiceVehicleInformationTable: React.FC<ServiceVehicleInformationTableProps> = ({ 
  serviceVehicleInformation 
}) => {
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between">
          <Card.Title>Servis Araç Bilgileri</Card.Title>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="table-hover text-nowrap mb-0"
              tBodyClass="table-group-divider"
              header={[
                { title: "Araç Plakası" },
                { title: "Servis Şoförü" },
                { title: "Bakım Tarihi" },
                { title: "Sigorta Yenileme Tarihi" },
                { title: "Muayene Tarihi" },
              ]}
            >
              {serviceVehicleInformation.map((vehicle, index) => (
                <tr key={`vehicle-${index}`}>
                  <td>{vehicle.plate_no}</td>
                  <td>{vehicle.service_driver}</td>
                  <td>{vehicle.maintenance_date}</td>
                  <td>{vehicle.insurance_and_renewal_date}</td>
                  <td>{vehicle.examination_date}</td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ServiceVehicleInformationTable