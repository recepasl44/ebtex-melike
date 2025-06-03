import { useState } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import { ServiceRoutePlan } from "../../../../../type";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";

interface ServiceRoutePlanTableProps {
  serviceRoute: ServiceRoutePlan[];
}

const ServiceRoutePlanTable: React.FC<ServiceRoutePlanTableProps> = ({ serviceRoute }) => {
  const [activeDay, setActiveDay] = useState<string>("Pazartesi");
  
const filteredRoutes = serviceRoute.filter(route => 
  route.days.includes(activeDay)
);

  // All days of the week for tabs
  const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  
  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between d-flex align-items-center">
          <Card.Title>Servis Rota Planı</Card.Title>
          <Nav className="nav nav-tabs nav-tabs-header">
            {weekDays.map(day => (
              <Nav.Item key={day}>
                <Nav.Link 
                  className={activeDay === day ? "active" : ""}
                  onClick={() => setActiveDay(day)}
                >
                  {day}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Card.Header>
        <Card.Body className="p-3">
          <div className="table-responsive">
            <SpkTablescomponent
              tableClass="text-wrap"
              tBodyClass="table-group-divider"
              header={[
                { title: "Grup" },
                { title: "Seans" },
                { title: "Kalkış Saati" },
                { title: "Varış Saati" },
                { title: "Rota" },
                { title: "Duraklar" },
              ]}
            >
              {filteredRoutes.map((route, index) => (
                <tr key={`route-${index}`}>
                  <td className="text-nowrap">{route.group}</td>
                  <td className="text-nowrap">{route.seanse}</td>
                  <td className="text-nowrap">{route.start_time}</td>
                  <td className="text-nowrap">{route.time_of_arrival}</td>
                  <td className="text-nowrap">{route.route}</td>
                  <td className="text-nowrap">
                    {route.stops.map((stop, i) => (
                      <span key={i}>
                        {stop}{i < route.stops.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </SpkTablescomponent>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ServiceRoutePlanTable