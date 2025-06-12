import { useState } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import { ServiceRoutePlan } from "../type.ts";
import SpkTablescomponent from "../../../../@spk-reusable-components/reusable-tables/tables-component.tsx";

interface ServiceRoutePlanTableProps {
  serviceRoute: ServiceRoutePlan[];
}

const ServiceRoutePlanTable: React.FC<ServiceRoutePlanTableProps> = ({ serviceRoute }) => {
  const [activeDay, setActiveDay] = useState<string>("Pazartesi");

  // All days of the week for tabs
  const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

  // Fixed height container style
  const containerStyle = {
    height: '300px', // Fixed height for rows + header
    maxHeight: '300px', // Ensure it doesn't expand
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden' // Hide overflow initially
  };
  
  // Inner scrollable container style
  const scrollContainerStyle = {
    overflowY: 'auto' as const, // Enable vertical scrolling
    flex: 1, // Take up all available space
    height: '100%' // Fill the container
  };

  // Prepare table data with empty rows if needed
  const prepareTableData = () => {
    const filteredRoutes = serviceRoute.filter(route =>
      route.days.includes(activeDay)
    );
    
    // If less than 5 rows, add empty rows to maintain height
    if (filteredRoutes.length < 5) {
      const emptyRowsNeeded = 5 - filteredRoutes.length;
      for (let i = 0; i < emptyRowsNeeded; i++) {
        // Add empty placeholder row
        filteredRoutes.push({
          group: '',
          seanse: '',
          start_time: '',
          time_of_arrival: '',
          route: '',
          stops: [],
          days: []
        } as ServiceRoutePlan);
      }
    }
    
    return filteredRoutes;
  };

  return (
    <Col xxl={12} xl={12}>
      <Card className="custom-card">
        <Card.Header className="justify-content-between d-flex align-items-center">
          <Card.Title>Servis Rota ve Durak Bilgileri</Card.Title>
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
          {/* Fixed height container with vertical scroll */}
          <div style={containerStyle}>
            <div style={scrollContainerStyle}>
              <SpkTablescomponent
                tableClass="text-wrap table-fixed mb-0"
                tBodyClass="table-group-divider"
                header={[
                  { title: "Grup" },
                  { title: "Seans" },
                  { title: "Kalkış Saati" },
                  { title: "Varış Saati" },
                  { title: "Rota" },
                  { title: "Duraklar" },
                  { title: "Detay" },
                ]}
              >
                {prepareTableData().map((route, index) => {
                  // Check if this is an empty row
                  const isEmpty = !route.group;
                  
                  return isEmpty ? (
                    <tr key={`empty-${index}`} style={{ height: '48px' }}>
                      <td colSpan={7}>&nbsp;</td>
                    </tr>
                  ) : (
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
                      <td className="text-nowrap text-center">
                        <div
                          style={{
                            background: '#f0f5ff',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <i className="bi bi-eye" style={{ color: '#6f7cff', fontSize: '16px' }}></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </SpkTablescomponent>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ServiceRoutePlanTable