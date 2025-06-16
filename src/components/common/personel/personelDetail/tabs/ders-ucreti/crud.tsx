// F:\xintra_react_ts\src\components\common\personel\personelDetail\tabs\ders-ucreti\crud.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useTuitionFeesAdd } from "../../../../../hooks/employee/tuition_fees/useTuitionFeesAdd";
import { useTuitionFeesUpdate } from "../../../../../hooks/employee/tuition_fees/useTuitionFeesUpdate";
import { TuitionFees } from "../../../../../../types/employee/tuition_fees/list";

type FormValues = {
  tarih: string;
  ders_sayisi: number | "";
  ders_ucreti: number | "";
};

export default function PersonelTuitionFeeCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedTuition?: TuitionFees };
  };
  const personelId = state?.personelId;
  const selectedTuition = state?.selectedTuition;

  const { addNewTuitionFees, loading: addLoading, error: addError } =
    useTuitionFeesAdd();
  const {
    updateExistingTuitionFees,
    loading: updateLoading,
    error: updateError,
  } = useTuitionFeesUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    tarih: "",
    ders_sayisi: "",
    ders_ucreti: "",
  });

  // populate form when updating
  useEffect(() => {
    if (mode === "update" && selectedTuition) {
      setInitialValues({
        tarih: selectedTuition.tarih || "",
        ders_sayisi: selectedTuition.ders_sayisi ?? "",
        ders_ucreti: selectedTuition.ders_ucreti
          ? Number(selectedTuition.ders_ucreti)
          : "",
      });
    }
  }, [mode, selectedTuition]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "tarih",
      label: "Tarih",
      type: "date",
      required: true,
    },
    {
      name: "ders_sayisi",
      label: "Ders Sayısı",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "ders_ucreti",
      label: "1 Ders Ücreti",
      type: "currency",
      required: true,
    },
  ];

  async function handleSubmit(values: FormValues) {
    if (!personelId) return;

    const payload = {
      personel_id: personelId,
      tarih: values.tarih,
      ders_sayisi: Number(values.ders_sayisi),
      // ders_ucreti must be a string, not a number
      ders_ucreti: String(values.ders_ucreti),
    };

    if (mode === "add") {
      await addNewTuitionFees(payload);
    } else if (id) {
      await updateExistingTuitionFees({
        tuitionFeesId: Number(id),
        payload,
      });
    }

    navigate(-1);
  }


  const isLoading = addLoading || updateLoading;
  const error = addError || updateError;

  return (
    <ReusableModalForm<FormValues>
      show={true}
      title={mode === "add" ? "Ders Ücreti Ekle" : "Ders Ücreti Güncelle"}
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
