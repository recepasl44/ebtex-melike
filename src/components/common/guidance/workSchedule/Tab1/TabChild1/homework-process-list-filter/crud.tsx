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
  period_id?: number;
  period?: {
    start_date: string;
    end_date: string;
  };
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
  const studentId = getFromLocalStorage<string>(
    "01100001 01100010 01110101 01111010 01100101 01110010 01101011 01101111 01101101 01110101 01110010 01100011 01110101",
    ""
  );
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<PeriodFormData>({
    teacher_id: 0,
    program_id: 0,
    period_id: 0,
    lesson_id: 0,
    unit_id: 0,
    chapter_id: 0,
    topic_id: 0,
    source_id: 0,
    page_range: "",
    number_of_questions: 0,
    start_date: "",
    end_date: "",
    working_time: "",
    description: "",
    status: mode === "add" ? 2 : 0,
  });

  const { periodsData } = usePeriodsTable({
    enabled: true,
    page: 1,
    paginate: 100,
  });

  // periodsData değiştiğinde içeriğini kontrol et
  useEffect(() => {
    if (periodsData && periodsData.length > 0) {
      console.log("Periods veri yapısı:", periodsData[0]);
      console.log(
        "İlk period'un tarihleri:",
        periodsData[0].start_date,
        periodsData[0].end_date
      );
    }
  }, [periodsData]);

  // Period değişimini izle
  useEffect(() => {
    if (initialValues.period_id) {
      console.log("Period ID değişti:", initialValues.period_id);

      // Seçilen period'un verilerini bul
      const selectedPeriod = periodsData.find(
        (period) => period.id === Number(initialValues.period_id)
      );

      if (selectedPeriod) {
        console.log(
          "Seçilen period tarihleri:",
          selectedPeriod.start_date,
          selectedPeriod.end_date
        );

        // Period bilgilerine göre tarihleri güncelle
        setInitialValues((prev) => ({
          ...prev,
          start_date: selectedPeriod.start_date || "",
          end_date: selectedPeriod.end_date || "",
        }));
      }
    }
  }, [initialValues.period_id, periodsData]);

  const { lessonsData } = useLessonList({
    enabled: true,
    lesson_id: initialValues.lesson_id?.toString() || "",
  });

  // Üniteleri getir - Dersler seçildiğinde
  const { unitsData } = useUnitsTable({
    enabled: Boolean(initialValues.lesson_id),
    lesson_id: initialValues.lesson_id?.toString() || "",
  });

  // program_id değişimini izle
  useEffect(() => {
    if (initialValues.program_id) {
      // Program değişince altındaki bağımlı alanları sıfırla
      if (initialValues.lesson_id || initialValues.unit_id) {
        setInitialValues((prev) => ({
          ...prev,
          lesson_id: "",
          unit_id: "",
        }));
      }
    }
  }, [initialValues.program_id]);

  // lesson_id değişimini izle
  useEffect(() => {
    if (initialValues.lesson_id) {
      // Ders değişince altındaki bağımlı alanı sıfırla
      if (initialValues.unit_id) {
        setInitialValues((prev) => ({
          ...prev,
          unit_id: "",
        }));
      }
    }
  }, [initialValues.lesson_id]);

  // Kaynakları getir - Üniteler seçildiğinde
  const { sourcesData } = useSourcesList({
    enabled: Boolean(initialValues.program_id),
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
          onChange: (value, formik) => {
            console.log("Period seçildi (update mode):", value);
            formik.setFieldValue("period_id", value);

            // Seçilen period'un verilerini bul
            const selectedPeriod = periodsData.find(
              (period) => period.id === Number(value)
            );

            if (selectedPeriod) {
              formik.setFieldValue(
                "start_date",
                selectedPeriod.start_date || ""
              );
              formik.setFieldValue("end_date", selectedPeriod.end_date || "");

              setInitialValues((prev) => ({
                ...prev,
                period_id: value,
                start_date: selectedPeriod.start_date || "",
                end_date: selectedPeriod.end_date || "",
              }));
            }
          },
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

            setInitialValues((prev) => ({
              ...prev,
              lesson_id: value,
            }));
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
            setInitialValues((prev) => ({
              ...prev,
              level_id: value,
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
            console.log("Kaynaklar seçildi:", value);
            formik.setFieldValue(
              "source_ids",
              Array.isArray(value) ? value : [value]
            );

            // Değişiklikleri initialValues'a da yansıt
            setInitialValues((prev) => ({
              ...prev,
              source_ids: Array.isArray(value) ? value : [value],
            }));
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
        // getFields fonksiyonu içerisindeki period_id alanını günceleyin
        {
          name: "period_id",
          label: "Periyot No",
          type: "select" as const,
          options: periodsData.map((period) => ({
            label: period.name,
            value: period.id,
          })),
          onChange: (value, formik) => {
            console.log("Period seçildi:", value);
            formik.setFieldValue("period_id", value);

            // Seçilen period'un verilerini bul
            const selectedPeriod = periodsData.find(
              (period) => period.id === Number(value)
            );

            if (selectedPeriod) {
              console.log("Seçilen period bilgileri:", selectedPeriod);

              // Period'a ait tarih bilgilerini form alanlarına yerleştir
              formik.setFieldValue(
                "start_date",
                selectedPeriod.start_date || ""
              );
              formik.setFieldValue("end_date", selectedPeriod.end_date || "");

              // Aynı zamanda initialValues'a da kaydet
              setInitialValues((prev) => ({
                ...prev,
                period_id: value,
                start_date: selectedPeriod.start_date || "",
                end_date: selectedPeriod.end_date || "",
              }));
            }
          },
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
            console.log("Ders seçildi:", value);
            formik.setFieldValue("lesson_id", value);
            formik.setFieldValue("unit_id", "");
            formik.setFieldValue("chapter_id", "");

            // Değişiklikleri initialValues'a da yansıt
            setInitialValues((prev) => ({
              ...prev,
              lesson_id: value,
              unit_id: "",
              chapter_id: "",
            }));
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
            // Değişiklikleri initialValues'a da yansıt
            setInitialValues((prev) => ({
              ...prev,
              level_id: value,
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
            console.log("Kaynaklar seçildi:", value);
            formik.setFieldValue(
              "source_ids",
              Array.isArray(value) ? value : [value]
            );

            // Değişiklikleri initialValues'a da yansıt
            setInitialValues((prev) => ({
              ...prev,
              source_ids: Array.isArray(value) ? value : [value],
            }));
          },
        },
        {
          name: "page_range",
          label: "Sayfa Aralığı",
          type: "number",
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
      // Eğer güncelleme modundaysak ve veri geldiyse
      const selectedPeriod = periodsData.find(
        (period) => period.id === Number(fetchedAssignment.period_id)
      );

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
        start_date:
          selectedPeriod?.start_date || fetchedAssignment.start_date || "",
        end_date: selectedPeriod?.end_date || fetchedAssignment.end_date || "",
        description: fetchedAssignment.description || "",
        status: fetchedAssignment.status || 0,
      });
    }
  }, [mode, fetchedAssignment, periodsData]);

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
      // Seçilen period'dan start_date ve end_date bilgilerini al
      const selectedPeriod = periodsData.find(
        (period) => period.id === Number(values.period_id)
      );

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
        // Öncelikle doğrudan girilen değerleri kullan, yoksa period'dan alınan değerleri kullan
        start_date: values.start_date || selectedPeriod?.start_date || "",
        end_date: values.end_date || selectedPeriod?.end_date || "",
        description: values.description || "",
        status: Number(values.status || (mode === "add" ? 2 : 0)),
        student_id: Number(studentId || 0),
      };

      console.log("Form değerleri:", values);
      console.log("Seçilen period:", selectedPeriod);
      console.log("Gönderilecek payload:", payload);

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
