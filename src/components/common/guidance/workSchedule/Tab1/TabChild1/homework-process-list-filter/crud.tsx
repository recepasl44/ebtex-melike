import { FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLessonList } from "../../../../../../hooks/lessons/useList";
import { useUnitsTable } from "../../../../../../hooks/units/useList";
import { useSourcesList } from "../../../../../../hooks/sources/useList";
import { SourceData } from "../../../../../../../types/sources/list";
import ReusableModalForm, {
  FieldDefinition,
} from "../../../../../ReusableModalForm";
import { useScheduledAssignmentAdd } from "../../../../../../hooks/scheduledAssignments/useAdd";
import { useScheduledAssignmentUpdate } from "../../../../../../hooks/scheduledAssignments/useUpdate";
import { useScheduledAssignmentShow } from "../../../../../../hooks/scheduledAssignments/useDetail";
import { getFromLocalStorage } from "../../../../../../../utils/local_storage";
import getUserDataField from "../../../../../../../utils/user_data_field";
import { usePeriodsTable } from "../../../../../../hooks/periods/useList";

interface PeriodFormData extends FormikValues {
  teacher_id?: number;
  lesson_id?: number;
  unit_id?: number;
  chapter_id?: number;
  topic_id?: number;
  source_id?: number;
  number_of_questions?: number;
  page_range?: string;
  working_time?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: number; // //Dururm 0:Yapmadı, 1:Yapıldı, 2:Gelmedi, 3:Eksik, 4:Edilmedi
}

interface PeriodModalProps {
  show: boolean;
  onClose: () => void;
  onRefresh: () => void;
  start_date?: string;
}

const PeriodCrud: React.FC<PeriodModalProps> = ({ show, onRefresh }) => {
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const [formKey, setFormKey] = useState(0);
  // localStorage'dan tarihleri al
  const startDate = getFromLocalStorage<string>("period_start_date", "");
  const endDate = getFromLocalStorage<string>("period_end_date", "");
  const studentId = getFromLocalStorage<string>("selected_student_id", "");
  const navigate = useNavigate();

  // Context'teki tarih değişirse initialValues'i güncelle
  useEffect(() => {
    setInitialValues((prev) => ({
      ...prev,
      start_date: startDate,
      end_date: endDate,
    }));
  }, [startDate, endDate]);

  const [initialValues, setInitialValues] = useState<PeriodFormData>({
    teacher_id: 0,
    program_id: 0,
    lesson_id: 0,
    unit_id: 0,
    chapter_id: 0,
    topic_id: 0,
    source_id: 0,
    page_range: "",
    number_of_questions: 0,
    start_date: startDate, // Context'ten gelen tarihi kullan
    end_date: endDate, // Context'ten gelen tarihi kullan
    working_time: "",
    description: "",
    status: mode === "add" ? 2 : 0,
  });

  const { periodsData, status: periodsStatus } = usePeriodsTable({
    enabled: true,
    page: 1,
    paginate: 100,
  });

  // Dersleri getir - Periyotlar yüklendiğinde ve program_id varsa
  const { lessonsData } = useLessonList({
    enabled: periodsStatus === "SUCCEEDED" && !!initialValues.program_id,
    program_id: initialValues.program_id?.toString() || "",
  });

  // Üniteleri getir - Dersler seçildiğinde
  const { unitsData } = useUnitsTable({
    enabled: !!initialValues.lesson_id,
    lesson_id: initialValues.lesson_id?.toString() || "",
  });

  // Kaynakları getir - Üniteler seçildiğinde
  const { sourcesData } = useSourcesList({
    enabled: !!initialValues.unit_id,
  }) as { sourcesData: SourceData[] };

  const { me } = getUserDataField();

  const getFields = (): FieldDefinition[] => {
    if (mode === "update") {
      return [
        {
          name: "period_id",
          label: "Periyot No",
          type: "select" as const,
          options: periodsData.map((period) => ({
            label: period.name,
            value: period.id,
          })),
        },
        {
          name: "start_date",
          label: "Başlangıç Tarihi",
          type: "date",
          required: true,
          disabled: false,
        },
        {
          name: "end_date",
          label: "Bitiş Tarihi",
          type: "date",
          required: true,
          disabled: false,
        },
        {
          name: "lesson",
          label: "Ders Adı",
          type: "select" as const,
          options: lessonsData.map((lesson) => ({
            label: lesson.name,
            value: lesson.id,
          })),
          onChange: (value, formik) => {
            formik.setFieldValue("lesson_id", value);
            formik.setFieldValue("unit_id", "");
          },
        },
        {
          name: "unit_id",
          label: "Ünite/Konu",
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
          label: "Kaynak",
          type: "select",
          options:
            sourcesData?.map((source) => ({
              label: source.name,
              value: source.id || 0,
            })) || [],
          onChange: (value, formik) => {
            formik.setFieldValue("source_id", value);
          },
        },
        {
          name: "page_range",
          label: "Sayfa Aralığı",
          type: "text",
        },
        {
          name: "number_of_questions",
          label: "Soru Sayısı",
          type: "number",
          required: true,
        },
        {
          name: "working_time",
          label: "Çalışma Süresi",
          type: "number",
          required: true,
        },

        {
          name: "description",
          label: "Açıklama",
          type: "textarea",
        },
      ];
    } else {
      return [
        {
          name: "period_id",
          label: "Periyot No",
          type: "select" as const,
          options: periodsData.map((period) => ({
            label: period.name,
            value: period.id,
          })),
        },
        {
          name: "lesson",
          label: "Ders Adı",
          type: "select" as const,
          options: lessonsData.map((lesson) => ({
            label: lesson.name,
            value: lesson.id,
          })),
          onChange: (value, formik) => {
            formik.setFieldValue("lesson_id", value);
            formik.setFieldValue("unit_id", "");
          },
        },
        {
          name: "unit_id",
          label: "Ünite/Konu",
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
          label: "Kaynak",
          type: "select",
          options:
            sourcesData?.map((source) => ({
              label: source.name,
              value: source.id || 0,
            })) || [],
          onChange: (value, formik) => {
            formik.setFieldValue("source_id", value);
          },
        },
        {
          name: "page_range",
          label: "Sayfa Aralığı",
          type: "text",
        },
        {
          name: "number_of_questions",
          label: "Soru Sayısı",
          type: "number",
          required: true,
        },
        {
          name: "working_time",
          label: "Çalışma Süresi",
          type: "text",
          required: true,
        },

        {
          name: "description",
          label: "Açıklama",
          type: "textarea",
        },
      ];
    }
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
        period_id: fetchedAssignment.period_id || 0,
        teacher_id: fetchedAssignment.teacher_id || 0,
        lesson_id: fetchedAssignment.lesson_id || 0,
        unit_id: fetchedAssignment.unit_id || 0,
        chapter_id: fetchedAssignment.chapter_id || 0,
        topic_id: fetchedAssignment.topic_id || 0,
        source_id: fetchedAssignment.source_id || 0,
        page_range: fetchedAssignment.page_range || "",
        number_of_questions: fetchedAssignment.number_of_questions || 0,
        working_time: fetchedAssignment.working_time?.toString() || "",
        start_date: fetchedAssignment.start_date || "",
        end_date: fetchedAssignment.end_date || "",
        description: fetchedAssignment.description || "",
        status: fetchedAssignment.status || 0,
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

  const handleSubmit = async (values: PeriodFormData) => {
    try {
      const payload = {
        period_id: Number(values.period_id || 0),
        teacher_id: Number(me?.value || 0),
        lesson_id: Number(values.lesson_id || 0),
        unit_id: Number(values.unit_id || 0),
        chapter_id: Number(values.chapter_id || 0),
        topic_id: Number(values.topic_id || 0),
        source_id: Number(values.source_id || 0),
        number_of_questions: Number(values.number_of_questions || 0),
        working_time: values.working_time?.toString() || "",
        start_date: startDate || values.start_date || "", // Öncelikle context'ten, yoksa formdan al
        end_date: endDate || values.end_date || "",
        description: values.description || "",
        status: Number(values.status || (mode === "add" ? 2 : 0)),
        student_id: Number(studentId || 0), // Öğrenci ID'sini payload'a ekle
      };

      if (mode === "add") {
        await addNewScheduledAssignment(payload);
        // Form gönderimi başarılı olduğunda formKey'i artır
        setFormKey((prev) => prev + 1);

        onRefresh();
        // Başarı mesajı göster
        alert("Ders başarıyla kaydedildi. Yeni bir ders ekleyebilirsiniz.");
      } else if (mode === "update" && id) {
        await updateExistingScheduledAssignment({
          scheduledAssignmentId: Number(id),
          payload,
        });
        navigate(-1);
      }

      onRefresh();
    } catch (error) {
      console.error("Form gönderme hatası:", error);
    }
  };

  return (
    <ReusableModalForm<PeriodFormData>
      key={formKey}
      show={show}
      title={mode === "add" ? "Ders Ekle" : "Kontrol Edilen"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      cancelButtonLabel="İptal"
      isLoading={isLoading}
      error={combinedError || null}
      onClose={() => {
        navigate(-2);
      }}
      mode="double"
    />
  );
};

export default PeriodCrud;
