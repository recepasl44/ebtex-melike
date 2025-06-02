import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCourseUpdate } from "../../../components/hooks/course/useUpdate";
import { useCourseAdd } from "../../../components/hooks/course/useAdd";
import { useCourseShow } from "../../../components/hooks/course/useDetail";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { FormikHelpers, FormikValues } from "formik";
import DependentSelectField from "../../../utils/DependentSelectField";
import { Option } from "../../../components/hooks/utilshooks/useDependentOptions";
import { useBranchTable } from "../../../components/hooks/branch/useBranchList";
import { useListStudents } from "../../../components/hooks/student/useList";

interface CourseModalProps {
  show: boolean;
  token: string;
  onClose: () => void;
  onRefresh: () => void;
}

interface ICourseForm extends FormikValues {
  name: string;
  level_id: number;
  identity_no: string;
  birth_date: string;
  program: string;
  is_guardion: boolean;
  togglebar: boolean;
  branch?: string;
  student?: string;
}
const CourseModal: React.FC<CourseModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const [selectedParams, setSelectedParams] = useState<{
    branch_id?: string;
    program_id?: string;
    enabled?: boolean;
  }>({ enabled: false });
  const studentHook = useListStudents(selectedParams);
  const studentData = studentHook.data;
  const [initialValues, setInitialValues] = useState<ICourseForm>({
    name: "",
    level_id: 0,
    identity_no: "",
    birth_date: "",
    program: "Matematik",
    is_guardion: false,
    togglebar: true,
    branch: "",
    student: "",
  });
  const { branchData } = useBranchTable({});
  const branchOptions = useMemo(
    () =>
      branchData.map((b) => ({
        value: String(b.id),
        label: b.name,
      })),
    [branchData]
  );
  const fetchStudentOptionsByBranch = (branch: string): Promise<Option[]> => {
    return new Promise((resolve) => {
      if (!branch) {
        resolve([]);
        return;
      }
      const options: Option[] = studentData.map((student: any) => ({
        value: String(student.id),
        label: student.first_name,
      }));
      resolve(options);
    });
  };

  const getFields = (values: ICourseForm): FieldDefinition[] => {
    const baseFields: FieldDefinition[] = [
      {
        name: "branch",
        label: "Şube",
        type: "autocomplete",
        required: true,
        options: branchOptions,
        onClick: () => {
          setSelectedParams((prev) => ({
            ...prev,
            enabled: true,
          }));
          console.log("branch clicked");
        },
        onFocus: () => {
          setSelectedParams((prev) => ({
            ...prev,
            enabled: true,
          }));
        },
        onInputChange: (value: string) => {
          setSelectedParams((prev) => ({
            ...prev,
            branch_id: value,
            enabled: true,
          }));
        },
        onChange: (value: string, formik: any) => {
          formik.setFieldValue("branch", value);
          setSelectedParams((prev) => ({
            ...prev,
            branch_id: value,
            enabled: true,
          }));
        },
      },
      {
        name: "student",
        label: "Öğrenci",
        type: "select",
        required: true,
        renderForm: () => {
          return (
            <DependentSelectField
              name="student"
              dependencyName="branch"
              label=""
              fetchOptions={fetchStudentOptionsByBranch}
              required={true}
            />
          );
        },
      },
      {
        name: "program",
        label: "Program Seçiniz",
        type: "select",
        required: true,
        plus: "/programekle",
        options: [
          { label: "Matematik", value: "math" },
          { label: "Fizik", value: "physics" },
          { label: "Edebiyat", value: "literature" },
        ],
        onChange: (value: string, formik: any) => {
          formik.setFieldValue("program", value);
          setSelectedParams((prev) => ({
            ...prev,
            program_id: value,
          }));
        },
      },
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
        name: "para",
        label: "Para",
        type: "currency",
        required: true,
      },
      {
        name: "birth_date",
        label: "Doğum Tarihi",
        type: "date",
        required: true,
      },
      {
        name: "togglebar",
        label: "Togglebar",
        type: "togglebar",
      },
      {
        name: "checkbox",
        label: "Checkbox",
        type: "checkbox",
      },
      {
        name: "email",
        label: "Email",
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
      {
        name: "sınıf",
        label: "Sınıf",
        type: "select",
        required: true,
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
  const {
    updateExistingCourse,
    status: updateStatus,
    error: updateError,
  } = useCourseUpdate();
  const {
    course: fetchedCourse,
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
    if (mode === "update" && fetchedCourse) {
      setInitialValues({
        name: fetchedCourse.name || "",
        level_id: fetchedCourse.level_id || 0,
        identity_no: fetchedCourse.identity_no || "",
        birth_date: fetchedCourse.birth_date || "",
        program: fetchedCourse.program || "",
        is_guardion: fetchedCourse.is_guardion || false,
        togglebar: fetchedCourse.program === "Matematik" ? true : false,
        branch: fetchedCourse.branch || "",
        student: fetchedCourse.student || "",
      });

      if (fetchedCourse.branch) {
        setSelectedParams((prev) => ({
          ...prev,
          branch_id: String(fetchedCourse.branch),
          enabled: true,
        }));
      }
      if (fetchedCourse.program) {
        setSelectedParams((prev) => ({
          ...prev,
          program_id: String(fetchedCourse.program),
        }));
      }
    }
  }, [mode, fetchedCourse]);

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
    values: ICourseForm,
    _helpers: FormikHelpers<ICourseForm>
  ) {

    if (values.program === "math") {
      values.togglebar = true;
    }

    if (mode === "add") {
      await addNewCourse(values);
    } else if (mode === "update" && id) {
      await updateExistingCourse({ courseId: Number(id), payload: values });
    }

    onRefresh();
    onClose();
  }

  return (
    <ReusableModalForm<ICourseForm>
      show={show}
      title={mode === "add" ? "Şube Ekle" : "Şube Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      error={combinedError || null}
      onClose={onClose}
      autoGoBackOnModalClose
      mode={"double"}
    />
  );
};

export default CourseModal;
