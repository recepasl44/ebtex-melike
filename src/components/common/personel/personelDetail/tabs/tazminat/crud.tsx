import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useCompensationAdd } from "../../../../../hooks/employee/compensation/useAdd";
import { useCompensationUpdate } from "../../../../../hooks/employee/compensation/useUpdate";
import { Compensation } from "../../../../../../types/employee/compensation/list";

type FormValues = {
  tazminat_turu: string;
  odeme_sekli: string;
  miktar: string;
  banka_hesap_adi: string;
  aciklama: string;
};

export default function PersonelCompensationCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedCompensation?: Compensation };
  };

  const personelId = state?.personelId;
  const selectedCompensation = state?.selectedCompensation;

  const {
    addNewCompensation,
    loading: addLoading,
    error: addError,
  } = useCompensationAdd();

  const {
    updateExistingCompensation,
    loading: updateLoading,
    error: updateError,
  } = useCompensationUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    tazminat_turu: "",
    odeme_sekli: "",
    miktar: "",
    banka_hesap_adi: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedCompensation) {
      setInitialValues({
        tazminat_turu: selectedCompensation.tazminat_turu || "",
        odeme_sekli: selectedCompensation.odeme_sekli || "",
        miktar: selectedCompensation.miktar || "",
        banka_hesap_adi: selectedCompensation.banka_hesap_adi || "",
        aciklama: selectedCompensation.aciklama || "",
      });
    }
  }, [mode, selectedCompensation]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "tazminat_turu",
      label: "Tazminat Türü",
      type: "select",
      required: true,
      options: [
        { label: "İhbar Tazminatı", value: "İhbar Tazminatı" },
        { label: "Kıdem Tazminatı", value: "Kıdem Tazminatı" },
      ],
    },
    {
      name: "odeme_sekli",
      label: "Ödeme Şekli",
      type: "select",
      required: true,
      options: [
        { label: "Nakit", value: "Nakit" },
        { label: "Banka", value: "Banka" },
      ],
    
    },
    
    {
      name: "miktar",
      label: "Miktar",
      type: "currency",
      required: true,
    },
    {
      name: "banka_hesap_adi",
      label: "Banka Hesap Adı",
      type: "text",
    },
    {
      name: "aciklama",
      label: "Açıklama",
      type: "textarea",
    },
  ];

  async function handleSubmit(values: FormValues) {
    if (!personelId && mode === "add") return;

    if (mode === "add") {
      await addNewCompensation({
        personel_id: personelId!,
        tazminat_turu: values.tazminat_turu,
        odeme_sekli: values.odeme_sekli,
        miktar: values.miktar,
        banka_hesap_adi: values.banka_hesap_adi,
        aciklama: values.aciklama,
      });
    } else if (id) {
      await updateExistingCompensation({
        compensationId: Number(id),
        payload: {
          tazminat_turu: values.tazminat_turu,
          odeme_sekli: values.odeme_sekli,
          miktar: values.miktar,
          banka_hesap_adi: values.banka_hesap_adi,
          aciklama: values.aciklama,
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
      title={mode === "add" ? "Tazminat Ekle" : "Tazminat Güncelle"}
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
