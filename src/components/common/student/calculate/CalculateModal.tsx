import React from "react";
import { Modal, Button } from "react-bootstrap";
import CalculatePage from "./index";

interface CalculateModalProps {
  show: boolean;
  onHide: () => void;
  studentId?: number | null;
}

const CalculateModal: React.FC<CalculateModalProps> = ({
  show,
  onHide,
  studentId,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Ücret Hesaplama</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CalculatePageWithProps studentId={studentId} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CalculatePageWithProps: React.FC<{ studentId?: number | null }> = ({
  studentId,
}) => {
  return <CalculatePage studentId={studentId} />;
};

export default CalculateModal;
