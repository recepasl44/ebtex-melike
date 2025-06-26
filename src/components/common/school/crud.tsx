import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormikHelpers } from "formik";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { useSchoolAdd } from "../../hooks/school/useSchoolAdd";
import { useSchoolUpdate } from "../../hooks/school/useSchoolUpdate";
import { useSchoolShow } from "../../hooks/school/useSchoolShow";

interface SchoolModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

interface ISchoolForm {
  name: string;
  country_id?: number;
  country?: {
    id: number;
    name: string;
  };
  city_id?: number;
  city?: {
    id: number;
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

const SchoolModal: React.FC<SchoolModalProps> = ({ show, onClose, onRefresh }) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<ISchoolForm>({
    name: "",
    country_id: undefined,
    country: { id: 0, name: "" },
    city_id: undefined,
    city: {
      id: 0,
      country_id: 0,
      country: { id: 0, name: "" },
      name: "",
    },
    county_id: undefined,
    county: { id: 0, name: "" },
    code: "",
    website: "",
    address: "",
    phone: "",
    email: "",
    fax: "",
    additional_information: "",
    type_id: 0,
    type: { id: 0, name: "" },
  });

  const { addNewSchool, status: addStatus, error: addError } = useSchoolAdd();
  const { updateExistingSchool, status: updateStatus, error: updateError } =
    useSchoolUpdate();
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
      setInitialValues({
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

  const fields: FieldDefinition[] = [
    { name: "name", label: "Okul Adı", type: "text", required: true },
    { name: "country.name", label: "Ülke", type: "text", required: true },
    { name: "city.id", label: "Şehir ID", type: "number", required: true },
    { name: "city.name", label: "Şehir", type: "text", required: true },
    { name: "county.name", label: "İlçe", type: "text", required: true },
    { name: "type.name", label: "Okul Tipi", type: "text", required: true },
  ];

  async function handleSubmit(values: ISchoolForm, _helpers: FormikHelpers<ISchoolForm>) {
    const payload = {
      name: values.name,
      country_id: values.country_id ?? values.country?.id,
      city_id: values.city_id ?? values.city?.id,
      county_id: values.county_id ?? values.county?.id,
      code: values.code,
      website: values.website,
      address: values.address,
      phone: values.phone,
      email: values.email,
      fax: values.fax,
      additional_information: values.additional_information,
      type_id: values.type_id ?? values.type?.id,
    };

    if (mode === "add") {
      await addNewSchool(payload);
    } else if (mode === "update" && id) {
      await updateExistingSchool({ schoolId: Number(id), payload });
    }
    onRefresh();
    onClose();
  }

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
    <ReusableModalForm<ISchoolForm>
      show={show}
      title={mode === "add" ? "Okul Ekle" : "Okul Güncelle"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={error || null}
      autoGoBackOnModalClose={true}
      onClose={onClose}
      mode="double"
    />
  );
};

export default SchoolModal;
