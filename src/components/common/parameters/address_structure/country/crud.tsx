import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../../../ReusableModalForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCountriesAdd } from "../../../../hooks/countries/useCountriesAdd";
import { useCountriesUpdate } from "../../../../hooks/countries/useCountriesUpdate";
import { useCountriesShow } from "../../../../hooks/countries/useCountriesShow";

interface CountryFormData extends FormikValues {
  name: string;
}

interface CountryModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const CountryModal: React.FC<CountryModalProps> = ({ }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<CountryFormData>({
    name: "",
  });

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Ülke Adı",
        type: "text",
        required: true,
      },
    ];
  };

  const { addNewCountry, status: addStatus, error: addError } = useCountriesAdd();

  const {
    updateExistingCountry,
    status: updateStatus,
    error: updateError,
  } = useCountriesUpdate();

  const {
    school: fetchedCountry,
    status: showStatus,
    error: showError,
    getSchool,
  } = useCountriesShow();

  useEffect(() => {
    if (mode === "update" && id) {
      getSchool(Number(id));
    }
  }, [mode, id, getSchool]);

  useEffect(() => {
    if (mode === "update" && fetchedCountry) {
      setInitialValues({
        name: fetchedCountry.name,
      });
    }
  }, [mode, fetchedCountry]);

  const isLoading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" && (updateStatus === "LOADING" || showStatus === "LOADING"));
  const combinedError =
    mode === "add" ? addError : mode === "update" ? updateError || showError : null;

  async function handleSubmit(
    values: CountryFormData,
    _helpers: FormikHelpers<CountryFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewCountry(values);
      } else if (mode === "update" && id) {
        await updateExistingCountry({ countryId: Number(id), payload: values });
      }
      navigate("/parameters/country");
    } catch (error) {
      console.error("Error saving country:", error);
    }
  }

  return (
    <ReusableModalForm<CountryFormData>
      show={true}
      title={mode === "add" ? "Ülke Ekle" : "Ülke Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      error={combinedError || null}
      onClose={() => navigate("/parameters/country")}
      autoGoBackOnModalClose
    />
  );
};

export default CountryModal;
