import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { useAgreementAdd } from "../../../../hooks/agreements/useAdd";
import { useStep4 } from "../../../../hooks/student/useStep4"; 
import { useEnrollmentsList } from "../../../../hooks/enrollments/useList"; 
import { toast } from "react-toastify";
interface CreateAgreementStep4Props {
  studentId: number;
  enrollmentIds: number[];
  onPrev: () => void;
  onNext: () => void;
}

const CreateAgreementStep4: React.FC<CreateAgreementStep4Props> = ({
  studentId,
  enrollmentIds,
  onPrev,
  onNext
}) => {

  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  // 1) useAgreementAdd
  const { addNewAgreement } = useAgreementAdd();
  const { data: enrollmentsData } = useEnrollmentsList({enabled:true,student_id:studentId});
  const enrollments_id = enrollmentsData?.map((enrollment: { id: any; }) => enrollment.id) || [];
  // 2) useStep4
  const { saveStep4 } = useStep4();
console.log("CreateAgreementStep4 props:", { studentId, enrollmentIds });
  useEffect(() => {
    async function fetchAgreementPdf() {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                student_id: studentId, 
                agreement_type: 1,
                enrollments: enrollments_id.map((id: any) => ({ id: String(id) })), 
            };

            const resp = await addNewAgreement(payload); 
            console.log("Agreement PDF response:", resp?.pdf_url);

            if (resp?.pdf_url) {
                setPdfUrl(resp?.pdf_url);
            } else {
                setError("PDF URL bulunamadı.");
            }
        } catch (err: any) {
            setError(err.message || "Beklenmedik bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    // studentId ve enrollmentIds kontrolünü kaldırdık
    fetchAgreementPdf();
}, []); // Sadece component mount olduğunda çalışacak

  // Modal aç/kapa
  function handleOpenSignature() {
    setShowSignatureModal(true);
  }
  function handleCloseSignature() {
    setShowSignatureModal(false);
  }
  function handleClearSignature() {
    sigCanvasRef.current?.clear();
  }

  // İmzayı kaydet => step4
  async function handleSaveSignature() {
    const dataUrl = sigCanvasRef.current?.toDataURL("image/png") || "";
    if (!dataUrl) {
      toast.error("İmza boş!");
      return;
    }
    setLoading(true);
    try {
      await saveStep4({
        studentId,
        agreement_file: dataUrl
      });
      toast.success("İmza kaydedildi, PDF güncellendi (varsayılan).");
      handleCloseSignature();
    } catch (err: any) {
      console.error("İmza kaydetme hatası:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h4>Step4: Sözleşme Oluşturma & İmza</h4>

      {loading && <div className="mb-2">
        <Spinner animation="border" size="sm" /> Yükleniyor...
      </div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          style={{ width: "100%", height: "80vh", border: "1px solid #999" }}
          title="Sözleşme PDF"
        />
      ) : (
        <p className="text-muted">Sözleşme PDF bekleniyor...</p>
      )}

      <div className="mt-3 d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={onPrev}>
          Geri
        </Button>
        <Button
          variant="primary"
          onClick={handleOpenSignature}
          disabled={!pdfUrl || loading}
        >
          İmza Ekle
        </Button>
        <Button variant="outline-secondary" onClick={onNext}>
          Tamamla
        </Button>
      </div>

      <Modal show={showSignatureModal} onHide={handleCloseSignature} centered>
        <Modal.Header closeButton>
          <Modal.Title>İmza Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignatureCanvas
            ref={sigCanvasRef}
            penColor="black"
            canvasProps={{
              width: 500,
              height: 200,
              className: "sigCanvas"
            }}
          />
          <Button variant="link" onClick={handleClearSignature}>
            Temizle
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignature}>
            Vazgeç
          </Button>
          <Button variant="primary" onClick={handleSaveSignature}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateAgreementStep4;
