import { FormikValues } from "formik";
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../../ReusableModalForm";
import { useScheduledAssignmentAdd } from "../../../../../hooks/scheduledAssignments/useAdd";
import { useScheduledAssignmentUpdate } from "../../../../../hooks/scheduledAssignments/useUpdate";
import { useScheduledAssignmentShow } from "../../../../../hooks/scheduledAssignments/useDetail";
import { useProgramsTable } from "../../../../../hooks/program/useList";
import { useClassroomList } from "../../../../../hooks/classrooms/useList";
import getUserDataField from "../../../../../../utils/user_data_field";
import { useLessonList } from "../../../../../hooks/lessons/useList";
import { useUnitsTable } from "../../../../../hooks/units/useList";
import { useSourcesList } from "../../../../../hooks/sources/useList";
import { SourceData } from "../../../../../../types/sources/list";

interface ScheduledAssignmentFormData extends FormikValues {
  type_id?: number;
  teacher_id?: number;
  program_id?: number | string;
  level_id?: number | string;
  lesson_id?: number | string;
  unit_id?: number | string;
  chapter_id?: number;
  topic_id?: number;
  achievement_id?: number;
  source_ids?: (number | string)[] | string;
  number_of_questions?: number;
  working_time?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  status?: number;
  // Form field'ları için ek alanlar
  lesson?: number | string;
  source_id?: (number | string)[] | string;
}

interface AnnualPlanModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const AnnualPlanCrud: React.FC<AnnualPlanModalProps> = ({
  
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const { default_branche } = getUserDataField();
  const navigate = useNavigate();

  const [programsOptions, setProgramsOptions] = useState<
    { label: string; value: any }[]
  >([]);
  const [levelOptions, setLevelOptions] = useState<
    { label: string; value: any }[]
  >([]);

  const [initialValues, setInitialValues] =
    useState<ScheduledAssignmentFormData>({
      type_id: 1,
      teacher_id: 0,
      program_id: "",
      level_id: "",
      lesson_id: "",
      lesson: "", // Form field için
      unit_id: "",
      chapter_id: 0,
      topic_id: 0,
      achievement_id: 0,
      source_ids: [],
      source_id: [], // Form field için
      number_of_questions: 0,
      working_time: "",
      start_date: "",
      end_date: "",
      description: "",
      status: mode === "add" ? 2 : 0,
    });

  const levelParams = useMemo(
    () => ({
      enabled: Boolean(initialValues.program_id),
      program_id: initialValues.program_id?.toString() || "",
      branch_id: default_branche,
    }),
    [initialValues.program_id, default_branche]
  );

  const { programsData } = useProgramsTable({ enabled: true });
  const { classroomData: levelsData } = useClassroomList(levelParams);

  useEffect(() => {
    if (programsData) {
      setProgramsOptions(
        programsData.map((p) => ({ label: p.name, value: p.id }))
      );
    }
  }, [programsData]);

  useEffect(() => {
    if (levelsData) {
      setLevelOptions(levelsData.map((l) => ({ label: l.name, value: l.id })));
    }
  }, [levelsData]);

  const { lessonsData } = useLessonList({
    enabled: Boolean(initialValues.program_id),
    program_id: initialValues.program_id?.toString() || "",
    level_id: initialValues.level_id?.toString() || "",
  });
  const { unitsData } = useUnitsTable({
    enabled: Boolean(initialValues.lesson_id),
    lesson_id: initialValues.lesson_id?.toString() || "",
  });

  const { sourcesData } = useSourcesList({
    enabled: Boolean(initialValues.program_id),
  }) as { sourcesData: SourceData[] };

  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "program_id",
        label: "Sınıf Seviyesi",
        type: "select",
        options: programsOptions,
        onChange: (value, formik) => {
          formik.setFieldValue("program_id", value);
          formik.setFieldValue("level_id", "");
          formik.setFieldValue("lesson", "");
          formik.setFieldValue("lesson_id", "");

          setInitialValues((prev) => ({
            ...prev,
            program_id: value,
          }));
        },
      },
      {
        name: "level_id",
        label: "Sınıf / Şube",
        type: "select",
        options: levelOptions,
        onChange: (value, formik) => {
          formik.setFieldValue("level_id", value);
          formik.setFieldValue("lesson", "");
          formik.setFieldValue("lesson_id", "");
          formik.setFieldValue("unit_id", "");

          setInitialValues((prev) => ({
            ...prev,
            level_id: value,
          }));
        },
      },
      {
        name: "lesson",
        label: "Ders",
        type: "select" as const,
        options: lessonsData.map((lesson) => ({
          label: lesson.name,
          value: lesson.id,
        })),
        onChange: (value, formik) => {
          formik.setFieldValue("lesson", value);
          formik.setFieldValue("lesson_id", value);
          formik.setFieldValue("unit_id", "");

          setInitialValues((prev) => ({
            ...prev,
            lesson_id: value,
          }));
        },
      },
      {
        name: "unit_id",
        label: "Ünite / Konu",
        type: "select",
        options: unitsData.map((unit) => ({
          label: unit.name,
          value: unit.id,
        })),
        onChange: (value, formik) => {
          formik.setFieldValue("unit_id", value);
          formik.setFieldValue("chapter_id", "");
          setInitialValues((prev) => ({
            ...prev,
            unit_id: value,
          }));
        },
      },
      {
        name: "source_id",
        label: "Kaynaklar",
        type: "multiselect",
        options:
          sourcesData?.map((source) => ({
            label: source.name || "İsimsiz Kaynak",
            value: source.id || source.teacher_id || 0,
          })) || [],
        onChange: (value, formik) => {
          formik.setFieldValue("source_id", value);
          formik.setFieldValue(
            "source_ids",
            Array.isArray(value) ? value : [value]
          );

          setInitialValues((prev) => ({
            ...prev,
            source_ids: Array.isArray(value) ? value : [value],
          }));
        },
      },
      {
        name: "start_date",
        label: "Başlangıç Tarihi",
        type: "date",
      },
      {
        name: "end_date",
        label: "Bitiş Tarihi",
        type: "date",
      },
      {
        name: "description",
        label: "Açıklama",
        type: "textarea",
      },
    ];
  };

  const {
    addNewScheduledAssignment,
    status: addStatus,
    error: addError,
  } = useScheduledAssignmentAdd();
  const {
    updateExistingScheduledAssignment,
    status: updateStatus,
    error: updateError,
  } = useScheduledAssignmentUpdate();

  const {
    scheduledAssignment: fetchedAssignment,
    status: showStatus,
    error: showError,
    getScheduledAssignment,
  } = useScheduledAssignmentShow();

  useEffect(() => {
    if (mode === "update" && id) {
      getScheduledAssignment(Number(id));
    }
  }, [mode, id, getScheduledAssignment]);

  useEffect(() => {
    if (mode === "update" && fetchedAssignment) {
      setInitialValues({
        type_id: fetchedAssignment.type_id || 1,
        teacher_id: fetchedAssignment.teacher_id,
        program_id: fetchedAssignment.program_id,
        level_id: fetchedAssignment.level_id,
        lesson_id: fetchedAssignment.lesson_id,
        lesson: fetchedAssignment.lesson_id, // Form field için
        unit_id: fetchedAssignment.unit_id,
        chapter_id: fetchedAssignment.chapter_id || 0,
        topic_id: fetchedAssignment.topic_id || 0,
        achievement_id: fetchedAssignment.achievement_id || 0,
        source_ids: fetchedAssignment.source_id
          ? [fetchedAssignment.source_id]
          : [],
        source_id: fetchedAssignment.source_id
          ? [fetchedAssignment.source_id]
          : [], // Form field için
        number_of_questions: fetchedAssignment.number_of_questions,
        working_time: fetchedAssignment.working_time?.toString() || "",
        start_date: fetchedAssignment.start_date || "",
        end_date: fetchedAssignment.end_date || "",
        description: fetchedAssignment.description || "",
        status: fetchedAssignment.status,
      });
    }
  }, [mode, fetchedAssignment]);

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

  const handleSubmit = async (values: ScheduledAssignmentFormData) => {
    try {
      const payload = {
        type_id: Number(values.type_id || 1),
        teacher_id: Number(values.teacher_id || 0),
        program_id: Number(values.program_id),
        level_id: Number(values.level_id),
        lesson_id: Number(values.lesson_id || values.lesson),
        unit_id: Number(values.unit_id),
        chapter_id: Number(values.chapter_id || 0),
        topic_id: Number(values.topic_id || 0),
        achievement_id: Number(values.achievement_id || 0),
        source_id:
          Array.isArray(values.source_ids) && values.source_ids.length > 0
            ? Number(values.source_ids[0])
            : Array.isArray(values.source_id) && values.source_id.length > 0
              ? Number(values.source_id[0])
              : 0,
        number_of_questions: Number(values.number_of_questions),
        working_time: values.working_time?.toString() || "",
        start_date: values.start_date || "",
        end_date: values.end_date || "",
        description: values.description || "",
        status: Number(values.status || (mode === "add" ? 2 : 0)),
      };

      if (mode === "add") {
        await addNewScheduledAssignment(payload);
      } else if (mode === "update" && id) {
        await updateExistingScheduledAssignment({
          scheduledAssignmentId: Number(id),
          payload,
        });
      }
      navigate(-1);
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Form gönderme hatası:", error);
    }
  };

  return (
    <ReusableModalForm<ScheduledAssignmentFormData>
      show
      title={mode === "add" ? "Ödev Ekle" : "Ödev Düzenle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={isLoading}
      autoGoBackOnModalClose
      error={combinedError || null}
      onClose={() => navigate(-1)}
      mode="double"
    />
  );
};

export default AnnualPlanCrud;
