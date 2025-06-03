import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { useLevelAdd } from "../../../hooks/levels/useAdd";
import { useLevelUpdate } from "../../../hooks/levels/useUpdate";
import { useLevelDetail } from "../../../hooks/levels/useDetail";
interface ClassLevelFormData extends FormikValues {
  program_id?: number;
  name: string;
}

interface ClassLevelModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const ClassLevelModal: React.FC<ClassLevelModalProps> = ({}) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<ClassLevelFormData>({
    program_id: 0,
    name: "",
  });

  // Field definitions for the form

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Sınıf Seviyesi Adı",
        type: "text",
        required: true,
      },
    ];
  };

  const { addNewLevel, status: addStatus, error: addError } = useLevelAdd();

  const {
    updateExistingLevel,
    status: updateStatus,
    error: updateError,
  } = useLevelUpdate();

  const {
    levelDetail: fetchLevel,
    status: showStatus,
    error: showError,
    getLevelDetail,
  } = useLevelDetail();

  useEffect(() => {
    if (mode === "update" && id) {
      getLevelDetail(Number(id));
    }
  }, [mode, id, getLevelDetail]);

  useEffect(() => {
    if (mode === "update" && fetchLevel) {
      setInitialValues({
        program_id: fetchLevel.program_id,
        name: fetchLevel.name,
      });
    }
  }, [mode, fetchLevel]);

  const isLoading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" &&
      (updateStatus === "LOADING" || showStatus === "LOADING"));
  const combinedError =
    mode === "add"
      ? addError
      : mode === "update"
      ? updateError || showError
      : null;

  const handleSubmit = async (
    values: ClassLevelFormData,
    _helpers: FormikHelpers<ClassLevelFormData>
  ) => {
    try {
      if (mode === "add") {
        await addNewLevel(values);
      } else if (mode === "update") {
        await updateExistingLevel({
          levelId: Number(id),
          payload: values,
        });
      }
      navigate("/educational-structure");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <ReusableModalForm<ClassLevelFormData>
      show={true}
      title={mode === "add" ? "Sınıf Seviyesi Ekle" : "Sınıf Seviyesi Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      error={combinedError || null}
      onClose={() => navigate("/educational-structure")}
      autoGoBackOnModalClose
    />
  );
};

export default ClassLevelModal;
