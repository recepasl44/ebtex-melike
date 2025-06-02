import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCourseUpdate } from "../../../components/hooks/course/useUpdate";
import { useCourseAdd } from "../../../components/hooks/course/useAdd";
import { useCourseShow } from "../../../components/hooks/course/useDetail";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { FormikHelpers, FormikValues } from "formik";

interface ICourseForm extends FormikValues {
  name: string;
  level_id: number;
  identity_no: string;
  birth_date: string;
  program: string;
  is_guardion: boolean;
  togglebar: boolean;
}

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<ICourseForm>({
    name: "",
    level_id: 0,
    identity_no: "",
    birth_date: "",
    program: "Matematik",
    is_guardion: false,
    togglebar: true,
  });


  const getFields = (values: ICourseForm): FieldDefinition[] => {
    const baseFields: FieldDefinition[] = [
      {
        name: "name",
        label: "Şube Adı",
        type: "text",
        required: true,
        minLength: 2,
        maxLength: 100,
      },
      {
        name: "level_id",
        label: "Level ID",
        type: "number",
        required: true,
        min: 1,
        max: 9999,
      },
      {
        name: "identity_no",
        label: "T.C. Kimlik",
        type: "text",
        required: true,
        pattern: /^[0-9]{11}$/,
        maxLength: 11,
      },
      {
        name: "birth_date",
        label: "Doğum Tarihi",
        type: "date",
        required: true,
      },
      {
        name: "program",
        label: "Program Seçiniz",
        type: "select",
        required: true,
        options: [
          { label: "Matematik", value: "math" },
          { label: "Fizik", value: "physics" },
          { label: "Edebiyat", value: "literature" },
        ],
      },
      {
        name: "togglebar",
        label: "togglebar",
        type: "togglebar",
      },
      {
        name: "para",
        label: "para",
        type: "currency",
        required: true,
      },
      {
        name: "email",
        label: "email",
        type: "email",
      },
      {
        name: "phone",
        label: "Telefon",
        type: "phone",
      },
      {
        name: "iban",
        label: "IBAN",
        type: "iban",
      },
    ];
    if (values.program === "physics") {
      baseFields.push({
        name: "is_guardion",
        label: "Rehber Öğretmen",
        type: "checkbox",
      });
    }
    return baseFields;
  };

  const { addNewCourse, status: addStatus, error: addError } = useCourseAdd();
  const { updateExistingCourse, status: updateStatus, error: updateError } = useCourseUpdate();
  const { course: fetchedCourse, status: showStatus, error: showError, getCourse } = useCourseShow();

  useEffect(() => {
    if (mode === "update" && id) {
      getCourse(Number(id));
    }
  }, [mode, id, getCourse]);

  useEffect(() => {
    if (mode === "update" && fetchedCourse) {
      setInitialValues({
        name: fetchedCourse.name || "",
        level_id: fetchedCourse.level_id || 0,
        identity_no: fetchedCourse.identity_no || "",
        birth_date: fetchedCourse.birth_date || "",
        program: fetchedCourse.program || "",
        is_guardion: fetchedCourse.is_guardion || false,
        togglebar: fetchedCourse.program === "Matematik" ? true : false,
      });
    }
  }, [mode, fetchedCourse]);

  const isLoading =
    (mode === "add" && addStatus === "LOADING") ||
    (mode === "update" && (updateStatus === "LOADING" || showStatus === "LOADING"));
  const combinedError =
    mode === "add" ? addError : mode === "update" ? updateError || showError : null;

  async function handleSubmit(values: ICourseForm, _helpers: FormikHelpers<ICourseForm>) {
    if (values.program === "math") {
      values.togglebar = true;
    }
    if (mode === "add") {
      await addNewCourse(values);
    } else if (mode === "update" && id) {
      await updateExistingCourse({ courseId: Number(id), payload: values });
    }
  }

  return (

    <ReusableModalForm<ICourseForm>
      show={false} 
      title={mode === "add" ? "Şube Ekle" : "Şube Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="İptal"
      isLoading={isLoading}
      error={combinedError || null}
      hideButtons={false} //
      onClose={() => {
      }}
    />
  );
};

export default CoursePage;
