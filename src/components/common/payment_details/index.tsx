import InstallmentsTable from "./tables/installments";
import PaidTable from "./tables/paid";
import RefundTable from "./tables/refund";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Modal, Row, Col, Accordion, Button, Card } from "react-bootstrap";
import { useShowStudent } from "../../hooks/student/useShowStudent";

interface IStudentDetailModalProps {
  show: boolean;
  student: {
    id: number;
    name: string;
  };
  onClose: () => void;
}

export default function StudentDetailModal({
  show,
  student,
  onClose,
}: IStudentDetailModalProps) {
  const { id } = useParams<{ id?: string }>();
  const { student: data, fetchStudent } = useShowStudent();

  useEffect(() => {
    if (id) {
      fetchStudent(Number(id));
    }
  }, [id, fetchStudent]);

  // Kullanılacak id değeri - URL'den gelen veya props olarak verilen
  const studentId = id || String(student?.id);

  // Kayıt/hizmet adını getiren yardımcı fonksiyon - inline kullanım için optimize edildi
  const getServiceName = (enrollment: any) =>
    enrollment.service?.name || "Hizmet";

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Ödeme Detayları - {data?.first_name}{" "}
          {data?.last_name || student?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Sol Kart - Taksit Tablosu */}
          <Col md={8}>
            <Card className="mb-4">
              <h6>Taksitler</h6>

              <Card.Body>
                {data?.enrollments && data.enrollments.length > 0 ? (
                  <Accordion defaultActiveKey="0">
                    {data.enrollments.map((enrollment, idx) => (
                      <Accordion.Item
                        eventKey={String(idx)}
                        key={`enrollment-${enrollment.id}`}
                      >
                        <Accordion.Header>
                          {getServiceName(enrollment)}
                        </Accordion.Header>
                        <Accordion.Body>
                          <InstallmentsTable
                            student={data}
                            enrollment={enrollment}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                  <p>Ödeme/Taksit bilgisi bulunamadı.</p>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <PaidTable />
            </Card>
            <Card>
              <RefundTable id={studentId} />
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
