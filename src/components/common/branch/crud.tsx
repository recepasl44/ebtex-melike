import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useBranchAdd } from "../../../components/hooks/branch/useBranchAdd";
import { useBranchUpdate } from "../../../components/hooks/branch/useBranchUpdate";
import { useBranchShow } from "../../../components/hooks/branch/useBranchShow";

interface IBranchFormData {
  name: string;
}

interface BranchModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const BranchModal: React.FC<BranchModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const [formData, setFormData] = useState<IBranchFormData>({ name: "" });

  const { addNewBranch, status: addStatus, error: addError } = useBranchAdd();
  const {
    updateExistingBranch,
    status: updateStatus,
    error: updateError,
  } = useBranchUpdate();
  const {
    branch: fetchedBranch,
    status: showStatus,
    error: showError,
    getBranch,
  } = useBranchShow();

  useEffect(() => {
    if (mode === "update" && id) {
      getBranch(Number(id));
    }
  }, [mode, id, getBranch]);

  useEffect(() => {
    if (mode === "update" && fetchedBranch) {
      setFormData({
        name: fetchedBranch.name,
      });
    }
  }, [mode, fetchedBranch]);
  console.log("fetchedBranch", fetchedBranch);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === "add") {
      await addNewBranch(formData);
    } else if (mode === "update" && id) {
      await updateExistingBranch({ branchId: Number(id), payload: formData });
    }
    onRefresh();
    onClose();
  };

  const loading =
    mode === "add"
      ? addStatus === "LOADING"
      : updateStatus === "LOADING" || showStatus === "LOADING";
  const error =
    mode === "add"
      ? addError
      : mode === "update"
      ? updateError || showError
      : null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "add" ? "Şube Ekle" : "Şube Güncelle"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Şube Adı</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Şube adını giriniz"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Vazgeç
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading
              ? "İşlem yapılıyor..."
              : mode === "add"
              ? "Ekle"
              : "Güncelle"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BranchModal;
