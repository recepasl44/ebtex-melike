import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLS } from "../../../helpers/url_helper";
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
  country_id: number;
  city_id: number;
  county_id: number;
  code: string;
  website: string;
  address: string;
  phone: string;
  email: string;
  fax: string;
  additional_information: string;
  type_id: number;
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
    country_id: 0,
    city_id: 0,
    county_id: 0,
    code: "",
    website: "",
    address: "",
    phone: "",
    email: "",
    fax: "",
    additional_information: "",
    type_id: 0,
  });

  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ISchoolFormData, string>>>({});
  const { addNewSchool } = useSchoolAdd();
  const { updateExistingSchool } = useSchoolUpdate();
  const {
    school: fetchedSchool,
    status: showStatus,
    error: showError,
    getSchool,
  } = useSchoolShow();

  const handleClose = () => {
    setGeneralError(null);
    setFieldErrors({});
    onClose();
  };

  useEffect(() => {
    if (mode === "update" && id) {
      getSchool(Number(id));
    }
  }, [mode, id, getSchool]);

  useEffect(() => {
    if (mode === "update" && fetchedSchool) {
      setFormData({
        name: fetchedSchool.name,
        country_id: fetchedSchool.country_id || 0,
        city_id: fetchedSchool.city_id || 0,
        county_id: fetchedSchool.county_id || 0,
        code: fetchedSchool.code || "",
        website: fetchedSchool.website || "",
        address: fetchedSchool.address || "",
        phone: fetchedSchool.phone || "",
        email: fetchedSchool.email || "",
        fax: fetchedSchool.fax || "",
        additional_information: fetchedSchool.additional_information || "",
        type_id: fetchedSchool.type_id || 0,
      });
    }
  }, [mode, fetchedSchool]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});
    setLoading(true);
    const payload = {
      name: formData.name,
      country_id: Number(formData.country_id) || 0,
      city_id: Number(formData.city_id) || 0,
      county_id: Number(formData.county_id) || 0,
      code: formData.code,
      website: formData.website,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      fax: formData.fax,
      additional_information: formData.additional_information,
      type_id: Number(formData.type_id) || 0,
    };

    try {
      if (mode === "add") {
        await axiosInstance.post(SCHOOLS, payload);
        // Also update redux state via hook
        await addNewSchool(payload);
      } else if (mode === "update" && id) {
        await axiosInstance.put(`${SCHOOLS}/${id}`, payload);
        await updateExistingSchool({ schoolId: Number(id), payload });
      }
      onRefresh();
      handleClose();
    } catch (err: any) {
      if (err.response?.status === 422) {
        const data = err.response.data.error || {};
        setGeneralError(data.message || "");
        setFieldErrors(data.details || {});
      } else {
        setGeneralError(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const isLoading = loading || showStatus === "LOADING";
  const error = showError || generalError;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton onHide={handleClose}>
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
            <Form.Label>Ülke ID</Form.Label>
            <Form.Control
              type="number"
              name="country_id"
              value={formData.country_id}
              onChange={handleChange}
              placeholder="Ülke ID giriniz"
              required
            />
            {fieldErrors.country_id && (
              <Form.Text className="text-danger">
                {fieldErrors.country_id}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Şehir ID</Form.Label>
            <Form.Control
              type="number"
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
              placeholder="Şehir ID giriniz"
              required
            />
            {fieldErrors.city_id && (
              <Form.Text className="text-danger">
                {fieldErrors.city_id}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>İlçe ID</Form.Label>
            <Form.Control
              type="number"
              name="county_id"
              value={formData.county_id}
              onChange={handleChange}
              placeholder="İlçe ID giriniz"
              required
            />
            {fieldErrors.county_id && (
              <Form.Text className="text-danger">
                {fieldErrors.county_id}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Okul Tipi ID</Form.Label>
            <Form.Control
              type="number"
              name="type_id"
              value={formData.type_id}
              onChange={handleChange}
              placeholder="Okul tipi ID giriniz"
              required
            />
            {fieldErrors.type_id && (
              <Form.Text className="text-danger">
                {fieldErrors.type_id}
              </Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            Vazgeç
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading
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
