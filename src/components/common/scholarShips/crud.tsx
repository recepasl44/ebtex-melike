import React, { useState, useEffect, FormEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useScholarShipsAdd } from "../../hooks/scholarShips/useScholarShipsAdd";
import { useScholarShipsUpdate } from "../../hooks/scholarShips/useScholarShipsUpdate";
import { useScholarShipsDetail } from "../../hooks/scholarShips/useScholarShipsDetail";

interface Props {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

interface FormData {
    short_name: string;
    name: string;
    branche_id: number;
    season_id: number;
    duration: number;
    status: number;
}

const ScholarshipModal: React.FC<Props> = ({ show, onClose, onRefresh }) => {
    const { id } = useParams<{ id?: string }>();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState<FormData>({
        short_name: "",
        name: "",
        branche_id: 0,
        season_id: 0,
        duration: 0,
        status: 1
    });
    const [validated, setValidated] = useState(false);

    const {
        addNewScholarship,
        status: addStatus,
        error: addError,
    } = useScholarShipsAdd();

    const {
        updateExistingScholarship,
        status: updateStatus,
        error: updateError,
    } = useScholarShipsUpdate();

    const {
        scholarship: fetched,
        status: fetchStatus,
        error: fetchError,
        getScholarship,
    } = useScholarShipsDetail();

    useEffect(() => {
        if (isEdit && id) {
            getScholarship(Number(id));
        }
    }, [isEdit, id, getScholarship]);

    useEffect(() => {
        if (isEdit && fetched && !Array.isArray(fetched)) {
            setFormData({
                short_name: fetched.short_name || "",
                name: fetched.name || "",
                branche_id: fetched.branche_id || 0,
                season_id: fetched.season_id || 0,
                duration: fetched.duration || 0,
                status: fetched.status || 1
            });
        }
    }, [isEdit, fetched]);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "status" || name === "branche_id" || name === "season_id" || name === "duration"
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        if (isEdit && id) {
            await updateExistingScholarship({
                scholarShipId: Number(id),
                payload: formData,
            });
        } else {
            await addNewScholarship(formData);
        }

        onRefresh();
        onClose();
    };

    const loading =
        fetchStatus === "LOADING" ||
        addStatus === "LOADING" ||
        updateStatus === "LOADING";
    const error = isEdit ? updateError || fetchError : addError;

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isEdit ? "Burs Kaydı Düzenle" : "Burs Kaydı Ekle"}
                </Modal.Title>
            </Modal.Header>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <Form.Group controlId="shortName" className="mb-3">
                        <Form.Label>Sınav Kısa Adı</Form.Label>
                        <Form.Control
                            type="text"
                            name="short_name"
                            value={formData.short_name}
                            onChange={handleChange}
                            placeholder="Kısa Ad..."
                            disabled={loading}
                            required
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group controlId="schoolTypeName" className="mb-3">
                        <Form.Label>Sınav Adı</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Sınav Adı..."
                            disabled={loading}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Bu alan zorunludur.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        Vazgeç
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                            <Spinner as="span" animation="border" size="sm" />
                        ) : isEdit ? (
                            "Güncelle"
                        ) : (
                            "Kaydet"
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ScholarshipModal;
