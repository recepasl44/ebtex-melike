import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../../ReusableModalForm";
import { useLessonList } from "../../../../../hooks/lessons/useList";
import { useListStudents } from "../../../../../hooks/student/useList";
import { useGuidanceObservationDetail } from "../../../../../hooks/guidanceObservations/useDetail";
import { useGuidanceObservationAdd } from "../../../../../hooks/guidanceObservations/useAdd";
import { useGuidanceObservationUpdate } from "../../../../../hooks/guidanceObservations/useUpdate";

interface GuidanceObservation extends FormikValues {
  id: number;
  student_id: number;
  student: any;
  lesson_id: number;
  lesson: any;
  teacher_id: number;
  teacher: any;
  title: string;
  description: string;
  observation_date: string;
  status: number;
}

interface ObservationModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const ObservationCrud: React.FC<ObservationModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const [initialValues, setInitialValues] = useState<GuidanceObservation>({
    id: 0,
    student_id: 0,
    student: {},
    lesson_id: 0,
    lesson: {},
    teacher_id: 0,
    teacher: {},
    title: "",
    description: "",
    observation_date: "",
    status: 0,
  });
  const { updateExistingGuidanceObservation } = useGuidanceObservationUpdate();
  const { addNewGuidanceObservation } = useGuidanceObservationAdd();
  const { data: studentNameData } = useListStudents({
    enabled: true,
    first_name: "",
    page: 1,
    pageSize: 100,
  });

  const { lessonsData } = useLessonList({
    enabled: true,
    program_id: "",
  });

  const {
    guidanceObservation: fetchedObservation,
    status: showStatus,
    error: showError,
    getGuidanceObservation,
  } = useGuidanceObservationDetail();

  useEffect(() => {
    if (mode === "update" && id) {
      getGuidanceObservation(Number(id));
    }
  }, [mode, id, getGuidanceObservation]);

  useEffect(() => {
    if (mode === "update" && fetchedObservation) {
      setInitialValues({
        id: fetchedObservation.id,
        student_id: fetchedObservation.student_id,
        student: fetchedObservation.student,
        lesson_id: fetchedObservation.lesson_id,
        lesson: fetchedObservation.lesson,
        teacher_id: fetchedObservation.teacher_id,
        teacher: fetchedObservation.teacher,
        title: fetchedObservation.title,
        description: fetchedObservation.description,
        observation_date: fetchedObservation.observation_date,
        status: fetchedObservation.status,
      });
    }
  }, [mode, fetchedObservation]);

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "student_id",
        label: "Öğrenci Adı Soyadı",
        type: "select",
        options:
          studentNameData?.map((student) => ({
            label: `${student.first_name} ${student.last_name}`,
            value: student.id,
          })) || [],
        required: true,
      },
      {
        name: "lesson_id",
        label: "Ders",
        type: "select",
        options:
          lessonsData?.map((lesson) => ({
            label: lesson.name,
            value: lesson.id,
          })) || [],
        required: true,
      },
      {
        name: "observation_date",
        label: "Tarih",
        type: "date",
        required: true,
      },
      {
        name: "title",
        label: "Gözlem Başlığı",
        type: "text",
        required: true,
      },
      {
        name: "description",
        label: "Gözlem Detayı",
        type: "textarea",
        required: true,
      },
    ];
  };

  const handleSubmit = async (values: GuidanceObservation) => {
    const payload = {
      student_id: values.student_id,
      lesson_id: values.lesson_id,
      teacher_id: values.teacher_id,
      title: values.title,
      description: values.description,
      observation_date: values.observation_date,
      status: Number(values.status || (mode === "add" ? 1 : 0)),
    };

    let result;
    if (mode === "add") {
      result = await addNewGuidanceObservation(payload);
      if (result) {
      }
    } else if (mode === "update" && id) {
      result = await updateExistingGuidanceObservation({
        guidanceObservationId: Number(id),
        payload,
      });
    }

    if (result) {
      onRefresh();
      onClose();
    }
  };

  return (
    <ReusableModalForm<GuidanceObservation>
      show={show}
      title={mode === "add" ? "Yeni Gözlem Ekle" : "Gözlem Düzenle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      isLoading={showStatus === "LOADING"}
      error={showError || null}
      onClose={onClose}
      mode="double"
    />
  );
};

export default ObservationCrud;
