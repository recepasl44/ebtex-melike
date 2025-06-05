import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { FormikHelpers, FormikValues } from "formik";
import { useProgramAdd } from "../../../hooks/program/useAdd";
import { useProgramUpdate } from "../../../hooks/program/useUpdate";
import { useProgramDetail } from "../../../hooks/program/useDetail";

interface SchoolLevelFormData extends FormikValues {
  name: string;
  category_id: number;
}

interface LevelModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const LevelModal: React.FC<LevelModalProps> = ({}) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<SchoolLevelFormData>({
    category_id: 0,
    name: "",
  });

  // Field definitions for the form
  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Okul Seviyesi Adı",
        type: "text",
        required: true,
      },
    ];
  };

  const { addNewProgram, status: addStatus, error: addError } = useProgramAdd();

  const {
    updateProgramDetails,
    status: updateStatus,
    error: updateError,
  } = useProgramUpdate();

  const {
    programDetail: fetchProgram,
    status: showStatus,
    error: showError,
    getProgramDetail,
  } = useProgramDetail();

  useEffect(() => {
    if (mode === "update" && id) {
      getProgramDetail(Number(id));
    }
  }, [mode, id, getProgramDetail]);

  useEffect(() => {
    if (mode === "update" && fetchProgram) {
      setInitialValues({
        category_id: fetchProgram.category_id ?? 0,
        name: fetchProgram.name,
      });
    }
  }, [mode, fetchProgram]);

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

  async function handleSubmit(
    values: SchoolLevelFormData,
    _helpers: FormikHelpers<SchoolLevelFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewProgram(values);
      } else if (mode === "update" && id) {
        await updateProgramDetails({
          categoryId: id,
          payload: {
            name: values.name,
          },
        });
      }
      navigate("/educational-structure");
    } catch (error) {
      console.error("Error submitting form aa:", error);
    }
  }

  return (
    <ReusableModalForm<SchoolLevelFormData>
      show={true}
      title={mode === "add" ? "Okul Türü Ekle" : "Okul Türü Güncelle"}
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

export default LevelModal;
