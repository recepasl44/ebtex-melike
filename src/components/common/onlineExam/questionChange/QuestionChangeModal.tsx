import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { QuestionCurriculumData } from "../../../../types/questioncurriculums/list";
import { useQuestionCurriculumsUpdate } from "../../../hooks/questioncurriculums/useUpdate";
import QuestionCurriculumsListStatus from "../../../../enums/questioncurriculums/list";

interface QuestionChangeModalProps {
  show: boolean;
  onHide: () => void;
  questionData: QuestionCurriculumData | null;
  onUpdate?: () => void;
}

const QuestionChangeModal: React.FC<QuestionChangeModalProps> = ({
  show,
  onHide,
  questionData,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    cevap_anahtari: "",
    zorluk: "",
    uyumluluk_puani: "",
    sinav_tipi: "",
    video_cozumu: "",
    kimyanin_bilim_olma_sureci: "",
    kimyanin_disiplinleri_ve_calisma_alanlari: "",
    simyanin_calisma_alanlari: "",
    simya_ile_kimya_bilimi_arasindaki_farklar: "",
    baglica_kimya_disiplinleri: "",
    kimya_endustrileri: "",
  });

  const { status: updateStatus, error, updateExistingQuestionCurriculum } = useQuestionCurriculumsUpdate();
  const loading = updateStatus === QuestionCurriculumsListStatus.LOADING;
  const success = updateStatus === QuestionCurriculumsListStatus.SUCCEEDED;

  useEffect(() => {
    if (questionData && show) {
      setFormData({
        cevap_anahtari: "A", // Default values based on the image
        zorluk: "Kolay",
        uyumluluk_puani: "80",
        sinav_tipi: "ÖSYM Tipi",
        video_cozumu: "https://...",
        kimyanin_bilim_olma_sureci: "0.6",
        kimyanin_disiplinleri_ve_calisma_alanlari: "0.4",
        simyanin_calisma_alanlari: "0.2",
        simya_ile_kimya_bilimi_arasindaki_farklar: "0.4",
        baglica_kimya_disiplinleri: "0.2",
        kimya_endustrileri: "0.2",
      });
    }
  }, [questionData, show]);

  useEffect(() => {
    if (success) {
      onHide();
      onUpdate?.();
      setFormData({
        cevap_anahtari: "",
        zorluk: "",
        uyumluluk_puani: "",
        sinav_tipi: "",
        video_cozumu: "",
        kimyanin_bilim_olma_sureci: "",
        kimyanin_disiplinleri_ve_calisma_alanlari: "",
        simyanin_calisma_alanlari: "",
        simya_ile_kimya_bilimi_arasindaki_farklar: "",
        baglica_kimya_disiplinleri: "",
        kimya_endustrileri: "",
      });
    }
  }, [success, onHide, onUpdate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionData?.id) return;

    // Since the API only supports specific fields, we'll update what we can
    const payload = {
      questionCurriculumId: questionData.id,
      payload: {
        question_id: questionData.question_id, // Keep existing
        lesson_id: questionData.lesson_id, // Keep existing  
        unit_id: questionData.unit_id, // Keep existing
        chapter_id: questionData.chapter_id, // Keep existing
        topic_id: questionData.topic_id, // Keep existing
        achievement_id: questionData.achievement_id, // Keep existing
        repetition: questionData.repetition, // Keep existing
        status: questionData.status, // Keep existing
      }
    };

    await updateExistingQuestionCurriculum(payload);
  };

  const handleClose = () => {
    setFormData({
      cevap_anahtari: "",
      zorluk: "",
      uyumluluk_puani: "",
      sinav_tipi: "",
      video_cozumu: "",
      kimyanin_bilim_olma_sureci: "",
      kimyanin_disiplinleri_ve_calisma_alanlari: "",
      simyanin_calisma_alanlari: "",
      simya_ile_kimya_bilimi_arasindaki_farklar: "",
      baglica_kimya_disiplinleri: "",
      kimya_endustrileri: "",
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Soru Değiştir</Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}
          
          <Row>
            {/* Sol taraf - Soru Görseli */}
            <Col md={6}>
              <div className="border rounded p-3 h-100">
                <h6 className="mb-3">Soru Görüntüsü</h6>
                {questionData?.question?.image_path ? (
                  <img 
                    src={questionData.question.image_path} 
                    alt="Soru" 
                    className="img-fluid"
                    style={{ maxHeight: '500px', width: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center bg-light rounded" style={{ height: '300px' }}>
                    <span className="text-muted">Soru görseli bulunamadı</span>
                  </div>
                )}
              </div>
            </Col>
            
            {/* Sağ taraf - Form Alanları */}
            <Col md={6}>
              <h6 className="mb-3">Bilgi</h6>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cevap Anahtarı</Form.Label>
                    <Form.Select
                      value={formData.cevap_anahtari}
                      onChange={(e) => handleInputChange('cevap_anahtari', e.target.value)}
                    >
                      <option value="">Seçiniz</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Zorluk</Form.Label>
                    <Form.Select
                      value={formData.zorluk}
                      onChange={(e) => handleInputChange('zorluk', e.target.value)}
                    >
                      <option value="">Seçiniz</option>
                      <option value="Kolay">Kolay</option>
                      <option value="Orta">Orta</option>
                      <option value="Zor">Zor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Uyumluluk Puanı</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="100"
                      value={formData.uyumluluk_puani}
                      onChange={(e) => handleInputChange('uyumluluk_puani', e.target.value)}
                      placeholder="% cinsinden"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Sınav Tipi</Form.Label>
                    <Form.Select
                      value={formData.sinav_tipi}
                      onChange={(e) => handleInputChange('sinav_tipi', e.target.value)}
                    >
                      <option value="">Seçiniz</option>
                      <option value="ÖSYM Tipi">ÖSYM Tipi</option>
                      <option value="Klasik">Klasik</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Video Çözümü</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.video_cozumu}
                  onChange={(e) => handleInputChange('video_cozumu', e.target.value)}
                  placeholder="https://..."
                />
              </Form.Group>

              <h6 className="mb-3 text-muted">Bölümler - Kazanım Puanı</h6>
              
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Kimyanın Bilim Olma Süreci</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={formData.kimyanin_bilim_olma_sureci}
                      onChange={(e) => handleInputChange('kimyanin_bilim_olma_sureci', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Kimyanın Disiplinleri ve Çalışma Alanları</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={formData.kimyanin_disiplinleri_ve_calisma_alanlari}
                      onChange={(e) => handleInputChange('kimyanin_disiplinleri_ve_calisma_alanlari', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h6 className="mb-3 text-muted">Konu / Kazanım</h6>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Simyanın Çalışma Alanları</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={formData.simyanin_calisma_alanlari}
                      onChange={(e) => handleInputChange('simyanin_calisma_alanlari', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Simya ile Kimya Bilimi Arasındaki Farklar</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={formData.simya_ile_kimya_bilimi_arasindaki_farklar}
                      onChange={(e) => handleInputChange('simya_ile_kimya_bilimi_arasindaki_farklar', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Başlıca Kimya Disiplinleri</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={formData.baglica_kimya_disiplinleri}
                      onChange={(e) => handleInputChange('baglica_kimya_disiplinleri', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Kimya Endüstrileri</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={formData.kimya_endustrileri}
                      onChange={(e) => handleInputChange('kimya_endustrileri', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            İptal
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Güncelleniyor..." : "Değiştir"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default QuestionChangeModal;
