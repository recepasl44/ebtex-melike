// src/components/common/personel/personelDetail/tabs/kesinti/crud.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useInterruptionAdd } from "../../../../../hooks/employee/interruption/useInterruptionAdd";
import { useInterruptionUpdate } from "../../../../../hooks/employee/interruption/useInterruptionUpdate";
import { Interruption } from "../../../../../../types/employee/interruption/list";

type FormValues = {
  vade: string;
  miktar: string;
  odeme_sekli: string;
  aciklama: string;
};

export default function PersonelKesintiCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const { state } = useLocation() as { state?: { personelId?: number; selectedKesinti?: Interruption } };
  const personelId = state?.personelId;
  const selectedKesinti = state?.selectedKesinti;

  const { addNewInterruption, loading: addLoading, error: addError } = useInterruptionAdd();
  const { updateExistingInterruption, loading: updateLoading, error: updateError } = useInterruptionUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    vade: "",
    miktar: "",
    odeme_sekli: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedKesinti) {
      setInitialValues({
        vade: selectedKesinti.vade || "",
        miktar: selectedKesinti.miktar,
        odeme_sekli: selectedKesinti.odeme_sekli || "",
        aciklama: selectedKesinti.aciklama || "",
      });
    }
  }, [mode, selectedKesinti]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "vade",
      label: "Vade",
      type: "date",
      required: true,
    },
    {
      name: "miktar",
      label: "Miktar",
      type: "currency",
      required: true,
    },
    {
      name: "odeme_sekli",
      label: "Ödeme Şekli",
      type: "select",
      required: true,
      options: [
        { label: "Nakit", value: "Nakit" },
        { label: "Banka", value: "Banka" },
      ],
    },
    {
      name: "aciklama",
      label: "Açıklama",
      type: "textarea",
    },
  ];

  async function handleSubmit(vals: FormValues) {
    if (!personelId) return;

    if (mode === "add") {
      await addNewInterruption({
        personel_id: personelId,
        vade: vals.vade,
        miktar: vals.miktar,
        odeme_sekli: vals.odeme_sekli,
        aciklama: vals.aciklama,
      });
    } else if (id) {
      await updateExistingInterruption({
        interruptionId: Number(id),
        payload: {
          vade: vals.vade,
          miktar: vals.miktar,
          odeme_sekli: vals.odeme_sekli,
          aciklama: vals.aciklama,
        },
      });
    }

    navigate(-1);
  }

  const isLoading = addLoading || updateLoading;
  const error = addError || updateError;

  return (
    <ReusableModalForm<FormValues>
      show
      title={mode === "add" ? "Kesinti Ekle" : "Kesinti Güncelle"}
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
