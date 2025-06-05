import { FormikHelpers, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../ReusableModalForm";
import { useCourseAdd } from "../../../hooks/course/useAdd";
import { useCourseUpdate } from "../../../hooks/course/useUpdate";
import useCourseShow from "../../../hooks/course/useDetail";

interface SchoolTrackFormData extends FormikValues {
  level_id?: number;
  name: string;
}

interface LevelModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

const TrackModal: React.FC<LevelModalProps> = ({}) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<SchoolTrackFormData>({
    level_id: 0,
    name: "",
  });

  // Field definitions for the form
  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "name",
        label: "Alan Adı",
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
    course: fetchCourse,
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
    if (mode === "update" && fetchCourse) {
      setInitialValues({
        level_id: fetchCourse.level_id,
        name: fetchCourse.name,
      });
    }
  }, [mode, fetchCourse]);

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
    values: SchoolTrackFormData,
    _helpers: FormikHelpers<SchoolTrackFormData>
  ) {
    try {
      if (mode === "add") {
        await addNewCourse({
          name: values.name,
          level_id: Number(values.level_id),
        });
      } else if (mode === "update" && id) {
        await updateExistingCourse({
          courseId: Number(id),
          payload: {
            name: values.name,
            level_id: values.level_id,
          },
        });
      }
      navigate("/educational-structure");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <ReusableModalForm<SchoolTrackFormData>
      show={true}
      title={mode === "add" ? "Alan Ekle" : "Alan Güncelle"}
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

export default TrackModal;
