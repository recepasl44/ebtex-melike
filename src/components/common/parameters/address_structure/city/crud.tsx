import { FormikHelpers, FormikValues } from "formik";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCourseAdd } from "../../../hooks/city/useAdd";
import { useCourseUpdate } from "../../../hooks/city/useUpdate";
import { useCourseShow } from "../../../hooks/city/useDetail";

interface CityFormData extends FormikValues {
  name: string;
}

interface CityModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const CityModal: React.FC<CityModalProps> = ({}) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<CityFormData>({
    name: "",
  });

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Şehir Adı",
        type: "text",
        required: true,
      },
    ];
  };

  const { addNewCourse, status: addStatus, error: addError } = useCourseAdd();

  const {
    updateExistingCourse,
    status: updateStatus,
    error: updateError,
  } = useCourseUpdate();

  const {
    course: fetchedCity,
    status: showStatus,
    error: showError,
    getCourse,
  } = useCourseShow();

  useEffect(() => {
    if (mode === "update" && id) {
      getCourse(Number(id));
    }
  }, [mode, id, getCourse]);

  useEffect(() => {
    if (mode === "update" && fetchedCity) {
      setInitialValues({
        name: fetchedCity.name,
      });
    }
  }, [mode, fetchedCity]);

  const isLoading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" && (updateStatus === "LOADING" || showStatus === "LOADING"));
  const combinedError =
    mode === "add" ? addError : mode === "update" ? updateError || showError : null;

  async function handleSubmit(
    values: CityFormData,
    _helpers: FormikHelpers<CityFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewCourse(values);
      } else if (mode === "update" && id) {
        await updateExistingCourse({ courseId: Number(id), payload: values });
      }
      navigate("/parameters/country");
    } catch (error) {
      console.error("Error saving city:", error);
    }
  }

  return (
    <ReusableModalForm<CityFormData>
      show={true}
      title={mode === "add" ? "Şehir Ekle" : "Şehir Güncelle"}
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

export default CityModal;
