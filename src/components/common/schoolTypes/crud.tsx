
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSchoolTypeAdd } from "../../../components/hooks/schoolTypes/useSchoolTypesAdd";
import { useSchoolTypeUpdate } from "../../../components/hooks/schoolTypes/useSchoolTypesUpdate";
import { useSchoolTypeShow } from "../../../components/hooks/schoolTypes/useSchoolTypesShow";

interface Props {
    show: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

interface FormData {
    name: string;
}

const SchoolTypeModal: React.FC<Props> = ({ show, onClose, onRefresh }) => {
    const { id } = useParams<{ id?: string }>();

    const isEdit = Boolean(id);

    const [formData, setFormData] = useState<FormData>({ name: "" });
    const [validated, setValidated] = useState(false);

    const {
        addNewSchoolTypes,
        status: addStatus,
        error: addError,
    } = useSchoolTypeAdd();

    const {
        updateExistingSchoolType,
        status: updateStatus,
        error: updateError,
    } = useSchoolTypeUpdate();
    const {
        schoolType: fetched,
        status: fetchStatus,
        error: fetchError,
        getSchoolType,
    } = useSchoolTypeShow();


    useEffect(() => {
        if (isEdit && id) {
            getSchoolType(Number(id));
        }
    }, [isEdit, id, getSchoolType]);


    useEffect(() => {
        if (isEdit && fetched && !Array.isArray(fetched)) {
            setFormData({ name: (fetched as { name: string }).name });
        }
    }, [isEdit, fetched]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ name: e.target.value });
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
            await updateExistingSchoolType({
                schoolTypeId: Number(id),
                payload: formData,
            });
        } else {
            await addNewSchoolTypes(formData);
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
                    {isEdit ? "Okul Tipi Düzenle" : "Okul Tipi Ekle"}
                </Modal.Title>
            </Modal.Header>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <Form.Group controlId="schoolTypeName" className="mb-3">
                        <Form.Label>Okul Tipi Adı</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Okul Tipi Adı..."
                            disabled={loading}
                            required
                            autoComplete="off"
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

export default SchoolTypeModal;
