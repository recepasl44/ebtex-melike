import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../../../ReusableModalForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDiscrictAdd } from "../../../../hooks/districts/useAdd";
import { useDiscrictUpdate } from "../../../../hooks/districts/useUpdate";
import { useDiscrictDetail } from "../../../../hooks/districts/useDetail";

interface CountyFormData extends FormikValues {
  name: string;
}

interface CountyModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const CountyModal: React.FC<CountyModalProps> = ({ }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<CountyFormData>({
    name: "",
  });

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "İlçe Adı",
        type: "text",
        required: true,
      },
    ];
  };

  const { addedDistrict, status: addStatus, error: addError, addNewDistrict } = useDiscrictAdd();

  const {
    updatedDiscrict,
    status: updateStatus,
    error: updateError,
    updateDiscrictDetails,
  } = useDiscrictUpdate();

  const {
    district,
    status: showStatus,
    error: showError,
    getDistrict,
  } = useDiscrictDetail({ districtId: 0, payload: { name: '' } });

  useEffect(() => {
    if (mode === "update" && id) {
      getDistrict(Number(id));
    }
  }, [mode, id, getDistrict]);

  useEffect(() => {
    if (mode === "update" && district) {
      setInitialValues({
        name: district.name,
      });
    }
  }, [mode, district]);

  const isLoading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" && (updateStatus === "LOADING" || showStatus === "LOADING"));
  const combinedError =
    mode === "add" ? addError : mode === "update" ? updateError || showError : null;

  async function handleSubmit(
    values: CountyFormData,
    _helpers: FormikHelpers<CountyFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewDistrict({
          name: values.name,
          county_id: 0
        });
      } else if (mode === "update" && id) {
        useDiscrictDetail({ districtId: Number(id), payload: { name: values.name } });
      }
      navigate("/parameters/country");
    } catch (error) {
      console.error("Error saving county:", error);
    }
  }

  return (
    <ReusableModalForm<CountyFormData>
      show={true}
      title={mode === "add" ? "İlçe Ekle" : "İlçe Güncelle"}
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

export default CountyModal;
