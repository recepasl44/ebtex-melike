import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { DiscountStudentData } from "../../../types/discountStudent/list";

export default function DiscountStudentReceipt() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const student: DiscountStudentData | undefined = state?.student;

  return (
    <Modal show centered onHide={() => navigate(-1)}>
      <Modal.Header closeButton>
        <Modal.Title>İndirimli Öğrenci Makbuzu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {student ? (
          <>
            <p>
              <strong>Sözleşme No:</strong> {student.sozlesme_no}
            </p>
            <p>
              <strong>Adı Soyadı:</strong> {student.ad} {student.soyad}
            </p>
            <p>
              <strong>Okul No:</strong> {student.okul_no}
            </p>
            <p>
              <strong>Okul Seviyesi:</strong> {student.program}
            </p>
            <p>
              <strong>Sınıf Seviyesi:</strong> {student.devre}
            </p>
            <p>
              <strong>Sınıf/Şube:</strong> {student.sinif}
            </p>
            <p>
              <strong>İndirim Adı:</strong> {student.indirim_adi}
            </p>
            <p>
              <strong>İndirim Tutarı:</strong> {student.enrollment_indirim}
            </p>
            <p>
              <strong>Kayıt Ücreti:</strong> ₺{student.toplam.toLocaleString()}
            </p>
          </>
        ) : (
          <p>Yükleniyor...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => window.print()}>
          Yazdır
        </Button>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
