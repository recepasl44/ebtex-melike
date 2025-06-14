import { Modal, Button, Table } from "react-bootstrap";
import { CheckRecord } from "../../../types/checksandpromissory/list";

interface DetailProps {
  show: boolean;
  onClose: () => void;
  record: CheckRecord | null;
}

export default function CheckDetail({ show, onClose, record }: DetailProps) {
  if (!record) return null;

  const rows = [
    ["Çek Türü", record.check_type],
    ["Çek Sahibi", record.owner],
    ["Firma", record.company],
    ["Verecekli", record.debtor],
    ["Alacaklı", record.creditor],
    ["Alacaklı Tel", record.creditor_phone],
    ["Türü", record.kind],
    ["Tarih", record.date],
    ["Alıcı Banka", record.recipient_bank],
    ["Belge No", record.document_no],
    ["Ödenecek Tutar", String(record.payable_amount)],
    ["Ödenen Tutar", String(record.paid_amount)],
    ["Kalan Tutar", String(record.remaining_amount)],
    ["Durum", record.status],
    ["Açıklama", record.description],
  ];

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detay</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label as string}>
                <th>{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
