import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSchoolCategoryAdd } from "../../../hooks/schoolcategories/useAdd";
import { useSchoolCategoryUpdate } from "../../../hooks/schoolcategories/useUpdate";
import { useSchoolCategoryDetail } from "../../../hooks/schoolcategories/useShow";

interface SchoolTypeFormData extends FormikValues {
  name: string;
}

interface SchoolTypeModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const SchoolTypeModal: React.FC<SchoolTypeModalProps> = ({}) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<SchoolTypeFormData>({
    name: "",
  });

  // Field definitions for the form
  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Okul Türü Adı",
        type: "text",
        required: true,
      },
    ];
  };

  const {
    addNewSchoolCategory,
    status: addStatus,
    error: addError,
  } = useSchoolCategoryAdd();

  const {
    updateExistingSchoolCategory,
    status: updateStatus,
    error: updateError,
  } = useSchoolCategoryUpdate();
  const {
    schoolCategory: fetchSchoolCategory,
    status: showStatus,
    error: showError,
    getSchoolCategory,
  } = useSchoolCategoryDetail();

  useEffect(() => {
    if (mode === "update" && id) {
      getSchoolCategory(Number(id));
    }
  }, [mode, id, getSchoolCategory]);

  useEffect(() => {
    if (mode === "update" && fetchSchoolCategory) {
      setInitialValues({
        name: fetchSchoolCategory.name,
      });
    }
  }, [mode, fetchSchoolCategory]);

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
    values: SchoolTypeFormData,
    _helpers: FormikHelpers<SchoolTypeFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewSchoolCategory(values);
      } else if (mode === "update" && id) {
        await updateExistingSchoolCategory({
          categoryId: Number(id),
          payload: values,
        });
      }
      navigate("/educational-structure");
    } catch (error) {
      console.error("Error saving category:", error);
    }
  }

  return (
    <ReusableModalForm<SchoolTypeFormData>
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

export default SchoolTypeModal;
