import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, Card, Modal } from "react-bootstrap";
import ReusableTable, { ColumnDefinition } from "../ReusableTable";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { formatCurrency, formatDate } from "../../../utils/formatters";

interface NoteEntry {
  date: string;
  note: string;
  promiseDate: string;
}

interface Installment {
  vade: string;
  alacak: number;
  alinan: number;
  kalan: number;
}

export default function OverduePaymentDetailPage() {
  const { soz_no } = useParams<{ soz_no: string }>();
  const navigate = useNavigate();

  const [showAddNote, setShowAddNote] = useState(false);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsMessage, setSmsMessage] = useState(
    "Ödemenizi lütfen en kısa sürede yapınız."
  );
  const [notes, setNotes] = useState<NoteEntry[]>([]);

  const installments = [
    { vade: "2025-06-01", alacak: 1000, alinan: 500, kalan: 500 },
    { vade: "2025-07-01", alacak: 1000, alinan: 0, kalan: 1000 },
  ];

  const installmentColumns: ColumnDefinition<Installment>[] = useMemo(
    () => [
      {
        key: "vade",
        label: "Vade",
        render: (r) => (
          <span className={new Date(r.vade) < new Date() ? "text-danger" : ""}>
            {formatDate(r.vade)}
          </span>
        ),
      },
      {
        key: "alacak",
        label: "Alacak",
        render: (r) => formatCurrency(r.alacak),
      },
      {
        key: "alinan",
        label: "Alınan",
        render: (r) => formatCurrency(r.alinan),
      },
      { key: "kalan", label: "Kalan", render: (r) => formatCurrency(r.kalan) },
    ],
    []
  );

  const noteColumns: ColumnDefinition<NoteEntry>[] = useMemo(
    () => [
      {
        key: "date",
        label: "Tarih",
        render: (r) => formatDate(r.date),
      },
      { key: "note", label: "Not", render: (r) => r.note },
      {
        key: "promiseDate",
        label: "Söz Verme Tarihi",
        render: (r) => (r.promiseDate ? formatDate(r.promiseDate) : "-"),
      },
    ],
    []
  );

  const noteFields: FieldDefinition[] = [
    { name: "note", label: "Not", type: "textarea", required: true },
    { name: "promiseDate", label: "Söz Verme Tarihi", type: "date" },
  ];

  function handleAddNote(values: { note: string; promiseDate: string }) {
    if (!values.note) return;
    setNotes([
      ...notes,
      {
        date: new Date().toISOString().split("T")[0],
        note: values.note,
        promiseDate: values.promiseDate,
      },
    ]);
    setShowAddNote(false);
  }

  return (
    <>
      <Modal show={true} onHide={() => navigate(-1)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Ödeme Detayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid mt-3">
            <div className="d-flex justify-content-end mb-2">
              <Button size="sm" variant="warning" onClick={() => setShowSmsModal(true)}>
                SMS/Bildirim
              </Button>
            </div>
            <h3 className="mb-3">Sözleşme No: {soz_no}</h3>
            <div className="mb-4">
              <p className="mb-1">Ad Soyad: Örnek Öğrenci</p>
              <p className="mb-1">Veli Adı & Tel: Örnek Veli - 0000 000 00 00</p>
              <p className="mb-1">Anne Adı & Tel: Örnek Anne - 0000 000 00 00</p>
              <p className="mb-1">Baba Adı & Tel: Örnek Baba - 0000 000 00 00</p>
            </div>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>
              <Card.Title>Ödeme Durumu</Card.Title>
            </Card.Header>
            <Card.Body>
              <ReusableTable<Installment>
                tableMode="single"
                showExportButtons={false}
                data={installments}
                columns={installmentColumns}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">Notlar</Card.Title>
              <Button size="sm" onClick={() => setShowAddNote(true)}>
                Ekle
              </Button>
            </Card.Header>
            <Card.Body>
              <ReusableTable<NoteEntry>
                tableMode="single"
                showExportButtons={false}
                data={notes}
                columns={noteColumns}
                customFooter={notes.length === 0 && (
                  <div className="text-center p-2">Not bulunamadı</div>
                )}
              />
            </Card.Body>
          </Card>
        </Col>
        </Row>
          </div>
        </Modal.Body>
      </Modal>

      <ReusableModalForm
        show={showAddNote}
        title="Not Ekle"
        fields={noteFields}
        initialValues={{ note: "", promiseDate: "" }}
        onSubmit={handleAddNote}
        confirmButtonLabel="Kaydet"
        cancelButtonLabel="Vazgeç"
        onClose={() => setShowAddNote(false)}
      />

      <Modal show={showSmsModal} onHide={() => setShowSmsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>SMS/Bildirim Gönder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Anne" checked disabled />
            <Form.Check type="checkbox" label="Baba" checked disabled />
            <Form.Check type="checkbox" label="Veli" checked disabled />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mesaj</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSmsModal(false)}>
            Kapat
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log("send sms", smsMessage);
              setShowSmsModal(false);
            }}
          >
            Gönder
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}