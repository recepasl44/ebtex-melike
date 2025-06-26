import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSchoolAdd } from "../../hooks/school/useSchoolAdd";
import { useSchoolUpdate } from "../../hooks/school/useSchoolUpdate";
import { useSchoolShow } from "../../hooks/school/useSchoolShow";
interface ISchoolModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

interface ISchoolFormData {
  name: string;
  country_id?: number;
  country?: {
    id: number;
    name: string;
  };
  city_id?: number;
  city?: {
    country_id: number;
    country: {
      id: number;
      name: string;
    };
    name: string;
  };
  county_id?: number;
  county?: {
    id: number;
    name: string;
  };
  code: string;
  website: string;
  address: string;
  phone: string;
  email: string;
  fax: string;
  additional_information: string;
  type_id: number;
  type?: {
    id: number;
    name: string;
  };
}
const SchoolModal: React.FC<ISchoolModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const [formData, setFormData] = useState<ISchoolFormData>({
    name: "",
    country_id: undefined,
    country: {
      id: 0,
      name: "",
    },
    city_id: undefined,
    city: {
      country_id: 0,
      country: {
        id: 0,
        name: "",
      },
      name: "",
    },
    county_id: undefined,
    county: {
      id: 0,
      name: "",
    },
    code: "",
    website: "",
    address: "",
    phone: "",
    email: "",
    fax: "",
    additional_information: "",
    type_id: 0,
    type: {
      id: 0,
      name: "",
    },
  });

  const { addNewSchool, status: addStatus, error: addError } = useSchoolAdd();
  const {
    updateExistingSchool,
    status: updateStatus,
    error: updateError,
  } = useSchoolUpdate();
  const {
    school: fetchedSchool,
    status: showStatus,
    error: showError,
    getSchool,
  } = useSchoolShow();

  useEffect(() => {
    if (mode === "update" && id) {
      getSchool(Number(id));
    }
  }, [mode, id, getSchool]);

  useEffect(() => {
    if (mode === "update" && fetchedSchool) {
      setFormData({
        name: fetchedSchool.name,
        country_id: fetchedSchool.country_id,
        country: fetchedSchool.country,
        city_id: fetchedSchool.city_id,
        city: fetchedSchool.city,
        county_id: fetchedSchool.county_id,
        county: fetchedSchool.county,
        code: fetchedSchool.code || "",
        website: fetchedSchool.website || "",
        address: fetchedSchool.address || "",
        phone: fetchedSchool.phone || "",
        email: fetchedSchool.email || "",
        fax: fetchedSchool.fax || "",
        additional_information: fetchedSchool.additional_information || "",
        type_id: fetchedSchool.type_id || 0,
        type: fetchedSchool.type,
      });
    }
  }, [mode, fetchedSchool]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...(prev as any)[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      country_id: formData.country_id ?? formData.country?.id,
      city_id: formData.city_id,
      county_id: formData.county_id,
      code: formData.code,
      website: formData.website,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      fax: formData.fax,
      additional_information: formData.additional_information,
      type_id: formData.type_id ?? formData.type?.id,
    };
    if (mode === "add") {
      await addNewSchool(payload);
    } else if (mode === "update" && id) {
      await updateExistingSchool({ schoolId: Number(id), payload });
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
          {mode === "add" ? "Okul Ekle" : "Okul Güncelle"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Okul Adı</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Okul adını giriniz"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ülke</Form.Label>
            <Form.Control
              type="text"
              name="country.name"
              value={formData.country?.name}
              onChange={handleChange}
              placeholder="Ülke adını giriniz"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Şehir</Form.Label>
            <Form.Control
              type="text"
              name="city.name"
              value={formData.city?.name}
              onChange={handleChange}
              placeholder="Şehir adını giriniz"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>İlçe</Form.Label>
            <Form.Control
              type="text"
              name="county.name"
              value={formData.county?.name}
              onChange={handleChange}
              placeholder="İlçe adını giriniz"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Okul Tipi</Form.Label>
            <Form.Control
              type="text"
              name="type.name"
              value={formData.type?.name}
              onChange={handleChange}
              placeholder="Okul tipi giriniz"
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

export default SchoolModal;