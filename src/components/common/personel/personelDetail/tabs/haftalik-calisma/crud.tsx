import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useWeeklyLessonCountAdd } from "../../../../../hooks/employee/weekly_lesson_count/useWeeklyLessonCountAdd";
import { useWeeklyLessonCountUpdate } from "../../../../../hooks/employee/weekly_lesson_count/useWeeklyLessonCountUpdate";
import { WeeklyLessonCount } from "../../../../../../types/employee/weekly_lesson_count/list";

type FormValues = {
  hafta_kac_gun: number;
  gunluk_ucret: number;
};

export default function PersonelWeeklyLessonCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedWeekly?: WeeklyLessonCount };
  };

  const personelId = state?.personelId;
  const selectedWeekly = state?.selectedWeekly;

  const {
    addNewWeeklyLessonCount,
    loading: addLoading,
    error: addError,
  } = useWeeklyLessonCountAdd();

  const {
    updateExistingWeeklyLessonCount,
    loading: updateLoading,
    error: updateError,
  } = useWeeklyLessonCountUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    hafta_kac_gun: 0,
    gunluk_ucret: 0,
  });

  useEffect(() => {
    if (mode === "update" && selectedWeekly) {
      setInitialValues({
        hafta_kac_gun: selectedWeekly.hafta_kac_gun,
        gunluk_ucret: Number(selectedWeekly.gunluk_ucret),
      });
    }
  }, [mode, selectedWeekly]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "hafta_kac_gun",
      label: "Hafta Kaç Gün Çalışılacak",
      type: "number",
      required: true,
    },
    {
      name: "gunluk_ucret",
      label: "Günlük Ücret",
      type: "currency",
      required: true,
    },
  ];

  async function handleSubmit(values: FormValues) {
    if (!personelId && mode === "add") return;

    if (mode === "add") {
      await addNewWeeklyLessonCount({
        personel_id: personelId!,
        hafta_kac_gun: values.hafta_kac_gun,
        gunluk_ucret: values.gunluk_ucret,
      });
    } else if (id) {
      await updateExistingWeeklyLessonCount({
        weeklyLessonCountId: Number(id),
        payload: {
          hafta_kac_gun: values.hafta_kac_gun,
          gunluk_ucret: values.gunluk_ucret,
        },
      });
    }

    navigate(-1);
  }

  const isLoading = addLoading || updateLoading;
  const error = addError || updateError;

  return (
    <ReusableModalForm<FormValues>
      show={true}
      title={mode === "add" ? "Haftalık Bilgi Ekle" : "Haftalık Bilgi Güncelle"}
      fields={getFields()}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Kaydet" : "Güncelle"}
      cancelButtonLabel="İptal"
      isLoading={isLoading}
      error={error || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose
      mode="double"
    />
  );
}
