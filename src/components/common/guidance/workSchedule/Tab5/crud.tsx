import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  type_id?: number;
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
  const mode = id ? "update" : "add";

  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");

  const [initialValues, setInitialValues] =
    useState<ScheduledAssignmentFormData>({
      type_id: 2,
      lesson_id: "",
      unit_id: "",
      chapter_id: 0,
      topic_id: 0,
      achievement_id: 0,
      source_ids: [],
      start_date: startDate || "",
      end_date: endDate || "",
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
    unit_id: initialValues.unit_id?.toString() || "",
  }) as { sourcesData: SourceData[] };

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
      console.log("Fetched Assignment Data:", fetchedAssignment); // Debug için

      // Tarih ve saat verilerini ayırın
      const startDateTime = fetchedAssignment.start_date || "";
      const endDateTime = fetchedAssignment.end_date || "";

      const startTime = startDateTime.includes(" ")
        ? startDateTime.split(" ")[1]?.substring(0, 5)
        : "";
      const endTime = endDateTime.includes(" ")
        ? endDateTime.split(" ")[1]?.substring(0, 5)
        : "";

      setInitialValues({
        type_id: fetchedAssignment.type_id || 2,
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
        start_date: fetchedAssignment.start_date || "",
        end_date: fetchedAssignment.end_date || "",
        start_time: startTime,
        end_time: endTime,
        status: fetchedAssignment.status,
      });
    }
  }, [mode, fetchedAssignment]);

  const getFields = (): FieldDefinition[] => {
    const commonFields = [
      {
        name: "start_time",
        label: "Başlangıç Saati",
        type: "time" as const,
        required: true,
      },
      {
        name: "end_time",
        label: "Bitiş Saati",
        type: "time" as const,
        required: true,
      },
      {
        name: "lesson", // Bu field name'i kullanın
        label: "Ders",
        type: "select" as const,
        options: lessonsData.map((lesson) => ({
          label: lesson.name,
          value: lesson.id,
        })),
        onChange: (value: any, formik: any) => {
          formik.setFieldValue("lesson", value);
          formik.setFieldValue("lesson_id", value); // Her ikisini de set edin
          formik.setFieldValue("unit_id", "");

          setInitialValues((prev) => ({
            ...prev,
            lesson_id: value,
            lesson: value,
          }));
        },
      },
      {
        name: "unit_id",
        label: "Ünite / Konu",
        type: "select" as const,
        options: unitsData.map((unit) => ({
          label: unit.name,
          value: unit.id,
        })),
        onChange: (value: any, formik: any) => {
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
        type: "multiselect" as const,
        options:
          sourcesData?.map((source) => ({
            label: source.name || "İsimsiz Kaynak",
            value: source.id || source.teacher_id || 0, // id kullanın
          })) || [],
        onChange: (value: any, formik: any) => {
          formik.setFieldValue(
            "source_id",
            Array.isArray(value) ? value : [value]
          );
          formik.setFieldValue(
            "source_ids",
            Array.isArray(value) ? value : [value]
          );
        },
      },
    ];

    if (mode === "update") {
      return [
        ...commonFields,
        {
          name: "status",
          label: "Durum",
          type: "select" as const,
          options: [
            { label: "Yapıldı", value: 1 },
            { label: "Yapılmadı", value: 0 },
            { label: "Eksik", value: 3 },
          ],
        },
      ];
    }

    return commonFields;
  };

  // Debug için initialValues değişimini takip edin
  useEffect(() => {
    console.log("Initial Values Updated:", initialValues);
  }, [initialValues]);

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
        start_date: `${startDate} ${values.start_time}:00`,
        end_date: `${endDate} ${values.end_time}:00`,
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
      isLoading={isLoading}
      error={combinedError || null}
      onClose={onClose}
      mode="double"
    />
  );
};

export default PlanCalenderCrud;
