import {Card, Col} from "react-bootstrap";
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
    return (
        <Col xxl={12} xl={12}>
            <Card className="custom-card">
                <Card.Header className="justify-content-between">
                    <Card.Title>Günlük Yoklama İzleme</Card.Title>
                </Card.Header>
                <Card.Body className="">
                    <ul className="d-flex flex-wrap mt3 list-unstyled justify-content-around text-center gap-2">
                        <li>
                            <div>
                                <div className="lh-1 me-1 mb-2">
                                       <span className="avatar avatar-md bg-primary-transparent border border-primary border-3 border-opacity-25 avatar-rounded">
                                         <i className="ri-stack-line fs-17 lh-1"></i>
                                       </span>
                                </div>
                                <div>
                                    <span className="d-block mb-0 text-muted fs-12">Sınıf Sayısı</span>
                                    <h5 className="fw-medium mb-0">{dailyAttendanceData?.class || "0"}</h5>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div className="lh-1 me-1 mb-2">
                                       <span className="avatar avatar-md bg-primary1-transparent border border-primary1 border-3 border-opacity-25 avatar-rounded">
                                         <i className="ri-calendar-todo-line fs-17 lh-1"></i>
                                       </span>
                                </div>
                                <div>
                                    <span className="d-block mb-0 text-muted fs-12">Alınan Ders</span>
                                    <h5 className="fw-medium mb-0">{dailyAttendanceData?.lesson_learned || "0"}</h5>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <div className="lh-1 me-1 mb-2">
                                       <span className="avatar avatar-md bg-primary2-transparent border border-primary2 border-3 border-opacity-25 avatar-rounded">
                                         <i className="ri-time-line fs-17 lh-1"></i>
                                       </span>
                                </div>
                                <div>
                                    <span className="d-block mb-0 text-muted fs-12">Alınmayan Ders</span>
                                    <h5 className="fw-medium mb-0">{dailyAttendanceData?.lesson_not_learned || "0"}</h5>
                                </div>
                            </div>
                        </li>
                    </ul>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DailyAttendanceMonitoring;
