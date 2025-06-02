import { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Table, Button, Form, Card } from "react-bootstrap";

interface NoteEntry {
  date: string;
  note: string;
  promiseDate: string;
}

export default function OverduePaymentDetailPage() {
  const { soz_no } = useParams<{ soz_no: string }>();

  const [showAdd, setShowAdd] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newPromiseDate, setNewPromiseDate] = useState("");
  const [notes, setNotes] = useState<NoteEntry[]>([]);

  const installments = [
    { vade: "2025-06-01", alacak: 1000, alinan: 500, kalan: 500 },
    { vade: "2025-07-01", alacak: 1000, alinan: 0, kalan: 1000 },
  ];

  function handleAddNote() {
    if (!newNote) return;
    setNotes([
      ...notes,
      {
        date: new Date().toISOString().split("T")[0],
        note: newNote,
        promiseDate: newPromiseDate,
      },
    ]);
    setNewNote("");
    setNewPromiseDate("");
    setShowAdd(false);
  }

  return (
    <div className="container-fluid mt-3">
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
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Vade</th>
                    <th>Alacak</th>
                    <th>Alınan</th>
                    <th>Kalan</th>
                  </tr>
                </thead>
                <tbody>
                  {installments.map((inst, idx) => (
                    <tr key={idx}>
                      <td>{inst.vade}</td>
                      <td>{inst.alacak}</td>
                      <td>{inst.alinan}</td>
                      <td>{inst.kalan}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title className="mb-0">Notlar</Card.Title>
              <Button size="sm" onClick={() => setShowAdd(!showAdd)}>
                Ekle
              </Button>
            </Card.Header>
            <Card.Body>
              {showAdd && (
                <div className="mb-3">
                  <Form.Group className="mb-2">
                    <Form.Label>Not</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Söz Verme Tarihi</Form.Label>
                    <Form.Control
                      type="date"
                      value={newPromiseDate}
                      onChange={(e) => setNewPromiseDate(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button size="sm" variant="secondary" className="me-2" onClick={() => setShowAdd(false)}>
                      İptal
                    </Button>
                    <Button size="sm" onClick={handleAddNote}>
                      Kaydet
                    </Button>
                  </div>
                </div>
              )}
              <Table bordered size="sm" responsive>
                <thead>
                  <tr>
                    <th>Tarih</th>
                    <th>Not</th>
                    <th>Söz Verme Tarihi</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note, idx) => (
                    <tr key={idx}>
                      <td>{note.date}</td>
                      <td>{note.note}</td>
                      <td>{note.promiseDate}</td>
                    </tr>
                  ))}
                  {notes.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center">
                        Not bulunamadı
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}