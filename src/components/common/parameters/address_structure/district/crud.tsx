import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../../../ReusableModalForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDiscrictAdd } from "../../../../hooks/districts/useAdd";
import { useDiscrictUpdate } from "../../../../hooks/districts/useUpdate";
import { useDiscrictDetail } from "../../../../hooks/districts/useDetail";

interface DistrictFormData extends FormikValues {
  name: string;
}

interface DistrictModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const DistrictModal: React.FC<DistrictModalProps> = ({ }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<DistrictFormData>({
    name: "",
  });

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Mahalle Adı",
        type: "text",
        required: true,
      },
    ];
  };

  const { status: addStatus, error: addError, addNewDistrict } = useDiscrictAdd();

  const {
    status: updateStatus,
    error: updateError,
    updateDiscrictDetails: updateProgramDetails,
  } = useDiscrictUpdate();

  const {
    district: programDetail,
    status: showStatus,
    error: showError,
    getDistrict: getProgramDetail,
  } = useDiscrictDetail({ districtId: 0, payload: { name: '' } });

  useEffect(() => {
    if (mode === "update" && id) {
      getProgramDetail(Number(id));
    }
  }, [mode, id, getProgramDetail]);

  useEffect(() => {
    if (mode === "update" && programDetail) {
      setInitialValues({
        name: programDetail.name,
      });
    }
  }, [mode, programDetail]);

  const isLoading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" && (updateStatus === "LOADING" || showStatus === "LOADING"));
  const combinedError =
    mode === "add" ? addError : mode === "update" ? updateError || showError : null;

  async function handleSubmit(
    values: DistrictFormData,
    _helpers: FormikHelpers<DistrictFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewDistrict({
          name: values.name,
          county_id: 0
        });
      } else if (mode === "update" && id) {
        await updateProgramDetails(Number(id), {
          name: values.name,
          county_id: 0
        });
      }
      navigate(`${import.meta.env.BASE_URL}parameters/country`);
    } catch (error) {
      console.error("Error saving district:", error);
    }
  }

  return (
    <ReusableModalForm<DistrictFormData>
      show={true}
      title={mode === "add" ? "Mahalle Ekle" : "Mahalle Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      error={combinedError || null}
      onClose={() => navigate(`${import.meta.env.BASE_URL}parameters/country`)}
      autoGoBackOnModalClose
    />
  );
};

export default DistrictModal;
