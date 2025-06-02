import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../ReusableModalForm";
import { useScheduledAssignmentAdd } from "../../../../hooks/scheduledAssignments/useAdd";
import { useScheduledAssignmentUpdate } from "../../../../hooks/scheduledAssignments/useUpdate";
import { useScheduledAssignmentShow } from "../../../../hooks/scheduledAssignments/useDetail";
import { useLessonList } from "../../../../hooks/lessons/useList";
import { useUnitsTable } from "../../../../hooks/units/useList";
import { useSourcesList } from "../../../../hooks/sources/useList";
import { SourceData } from "../../../../../types/sources/list";
import getUserDataField from "../../../../../utils/user_data_field";

interface ScheduledAssignmentFormData extends FormikValues {
  lesson_id?: number | string;
  unit_id?: number | string;
  chapter_id?: number;
  topic_id?: number;
  achievement_id?: number;
  source_ids?: (number | string)[] | string;
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  status?: number;
}

interface PlanCalenderModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const PlanCalenderCrud: React.FC<PlanCalenderModalProps> = ({
  show,
  onClose,
  onRefresh,
}) => {
  const { id } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const mode = id ? "update" : "add";

  const selectedDate = searchParams.get("date");

  const [initialValues, setInitialValues] =
    useState<ScheduledAssignmentFormData>({
      lesson_id: "",
      unit_id: "",
      chapter_id: 0,
      topic_id: 0,
      achievement_id: 0,
      source_ids: [],
      start_date: selectedDate || "",
      end_date: selectedDate || "",
      status: mode === "add" ? 2 : 0,
    });

  const { lessonsData } = useLessonList({
    enabled: true,
    program_id: initialValues.program_id?.toString() || "",
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
        name: "start_time",
        label: "Başlangıç Saati",
        type: "time",
        required: true,
      },
      {
        name: "end_time",
        label: "Bitiş Saati",
        type: "time",
        required: true,
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
        },
      },
      {
        name: "source_id",
        label: "Kaynaklar",
        type: "multiselect",
        options:
          sourcesData?.map((source) => ({
            label: source.name || "İsimsiz Kaynak",
            value: source.teacher_id || 0,
          })) || [],
        onChange: (value, formik) => {
          formik.setFieldValue(
            "source_ids",
            Array.isArray(value) ? value : [value]
          );
        },
      },
      {
        name: "status",
        label: "Durum",
        type: "select",
        options: [
          { label: "Yapıldı", value: 1 },
          { label: "Yapılmadı", value: 0 },
          { label: "Eksik", value: 3 },
        ],
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

  const { me } = getUserDataField();

  useEffect(() => {
    if (mode === "update" && fetchedAssignment) {
      setInitialValues({
        lesson_id: fetchedAssignment.lesson_id,
        unit_id: fetchedAssignment.unit_id,
        chapter_id: fetchedAssignment.chapter_id || 0,
        topic_id: fetchedAssignment.topic_id || 0,
        achievement_id: fetchedAssignment.achievement_id || 0,
        source_ids: fetchedAssignment.source_id
          ? [fetchedAssignment.source_id]
          : [],
        start_date: fetchedAssignment.start_date || "",
        end_date: fetchedAssignment.end_date || "",
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
        ...values,
        teacher_id: me?.value || 0,
        lesson_id: Number(values.lesson_id),
        unit_id: Number(values.unit_id),
        chapter_id: Number(values.chapter_id || 0),
        topic_id: Number(values.topic_id || 0),
        achievement_id: Number(values.achievement_id || 0),
        source_id:
          Array.isArray(values.source_ids) && values.source_ids.length > 0
            ? Number(values.source_ids[0])
            : 0,
        start_date: `${selectedDate} ${values.start_time}:00`,
        end_date: `${selectedDate} ${values.end_time}:00`,
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

      onRefresh();
      onClose();
    } catch (error) {
      console.error("Form gönderme hatası:", error);
    }
  };
  return (
    <ReusableModalForm<ScheduledAssignmentFormData>
      show={show}
      title={mode === "add" ? "Plan Ekle" : "Plan Düzenle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      cancelButtonLabel="İptal"
      isLoading={isLoading}
      error={combinedError || null}
      onClose={onClose}
      mode="double"
    />
  );
};

export default PlanCalenderCrud;
