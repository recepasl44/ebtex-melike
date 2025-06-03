import { Col, Nav, Card } from "react-bootstrap";
import { useState } from "react";
import SpkTablescomponent from "../../../../../../../../@spk-reusable-components/reusable-tables/tables-component";
import { PdrMeetingList } from "../../../../../type";

interface PDRMeetingListsTableProps {
    data: PdrMeetingList[]; 
}

const PDRMeetingListsTable: React.FC<PDRMeetingListsTableProps> = ({ data }) => {
    const [activeFilter, setActiveFilter] = useState("Bugün");
    
    // Function to determine status styling
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case "görüşülmedi":
                return "text-danger";
            case "tamamlandı":
                return "text-success";
            case "bekliyor":
                return "text-warning";
            default:
                return "";
        }
    };

    return (
        <Col xxl={6} xl={6}>
            <Card className="custom-card">
                <Card.Header className="justify-content-between d-flex align-items-center">
                    <Card.Title>PDR Görüşme Listeleri</Card.Title>
                    <Nav className="nav nav-tabs nav-tabs-header">
                        <Nav.Item>
                            <Nav.Link 
                                className={activeFilter === "Bugün" ? "active" : ""}
                                onClick={() => setActiveFilter("Bugün")}
                            >
                                Bugün
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link 
                                className={activeFilter === "Haftalık" ? "active" : ""}
                                onClick={() => setActiveFilter("Haftalık")}
                            >
                                Haftalık
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link 
                                className={activeFilter === "Aylık" ? "active" : ""}
                                onClick={() => setActiveFilter("Aylık")}
                            >
                                Aylık
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body className="p-3">
                    <div className="table-responsive">
                        <SpkTablescomponent
                            tableClass="text-wrap"
                            tBodyClass="table-group-divider"
                            header={[
                                { title: "Görüşme Türü" },
                                { title: "Tarih" },
                                { title: "Saat" },
                                { title: "Görüşme Süresi (dk)" },
                                { title: "Durum" },
                                { title: "Notlar" },
                            ]}
                        >
                            {data.map((meeting, index) => (
                                <tr key={`meeting-${index}`}>
                                    <td className="text-nowrap">{meeting.meeting_type}</td>
                                    <td className="text-nowrap">{meeting.date}</td>
                                    <td className="text-nowrap">{meeting.hourse}</td>
                                    <td className="text-nowrap">{meeting.minute}</td>
                                    <td className="text-nowrap">
                                        <span className={getStatusStyle(meeting.status)}>
                                            {meeting.status}
                                        </span>
                                    </td>
                                    <td className="text-truncate" style={{ maxWidth: "200px" }}>
                                        {meeting.description}
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

export default PDRMeetingListsTable;