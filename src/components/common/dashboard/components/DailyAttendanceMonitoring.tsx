import {Card, Col, Row} from "react-bootstrap";
import React from "react";

interface DailyAttendanceMonitoringProps {
    dailyAttendanceData: {
        class?: number;
        lesson_learned?: number;
        lesson_not_learned?: number;
    };
}

const DailyAttendanceMonitoring: React.FC<DailyAttendanceMonitoringProps> = ({
    dailyAttendanceData
}) => {
    // Card style with fixed height
    const cardStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const
    };
    
    // Card body style with fixed height
    const cardBodyStyle = {
        height: '300px', // Same height as other dashboard components
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    };
    
    // Avatar style with increased size
    const avatarStyle = {
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    
    // Icon style with increased size
    const iconStyle = {
        fontSize: '24px',
        lineHeight: 1
    };
    
    // Stat value style with increased size
    const valueStyle = {
        fontSize: '22px',
        marginTop: '12px'
    };

    return (
        <Col xxl={12} xl={12}>
            <Card className="custom-card" style={cardStyle}>
                <Card.Header className="justify-content-between">
                    <Card.Title>Günlük Yoklama İzleme</Card.Title>
                </Card.Header>
                <Card.Body style={cardBodyStyle}>
                    <Row className="text-center g-0 w-100">
                        <Col xs={4} className="px-2 d-flex flex-column justify-content-center">
                            <div className="mb-3 d-flex justify-content-center">
                                <span 
                                  className="avatar bg-primary-transparent border border-primary border-3 border-opacity-25 avatar-rounded"
                                  style={avatarStyle}
                                >
                                  <i className="bi bi-person-video3" style={iconStyle}></i>
                                </span>
                            </div>
                            <div>
                                <span className="d-block mb-2 text-muted text-nowrap fs-12">Sınıf Sayısı</span>
                                <h5 className="fw-medium mb-0" style={valueStyle}>{dailyAttendanceData?.class || "0"}</h5>
                            </div>
                        </Col>
                        <Col xs={4} className="px-2 d-flex flex-column justify-content-center">
                            <div className="mb-3 d-flex justify-content-center">
                                <span 
                                  className="avatar bg-primary1-transparent border border-primary1 border-3 border-opacity-25 avatar-rounded"
                                  style={avatarStyle}
                                >
                                  <i className="bi bi-journal-medical" style={iconStyle}></i>
                                </span>
                            </div>
                            <div>
                                <span className="d-block mb-2 text-nowrap text-muted fs-12">Alınan Ders</span>
                                <h5 className="fw-medium mb-0" style={valueStyle}>{dailyAttendanceData?.lesson_learned || "0"}</h5>
                            </div>
                        </Col>
                        <Col xs={4} className="px-2 d-flex flex-column justify-content-center">
                            <div className="mb-3 d-flex justify-content-center">
                                <span 
                                  className="avatar bg-primary2-transparent border border-primary2 border-3 border-opacity-25 avatar-rounded"
                                  style={avatarStyle}
                                >
                                  <i className="bi bi-journal-x" style={iconStyle}></i>
                                </span>
                            </div>
                            <div>
                                <span className="d-block mb-2 text-muted text-nowrap fs-12">Alınmayan Ders</span>
                                <h5 className="fw-medium mb-0" style={valueStyle}>{dailyAttendanceData?.lesson_not_learned || "0"}</h5>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DailyAttendanceMonitoring;