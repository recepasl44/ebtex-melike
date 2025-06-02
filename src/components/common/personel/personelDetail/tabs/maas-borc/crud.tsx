import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useDebtAdd } from "../../../../../hooks/employee/salary/debt/useDebtAdd";
import { useDebtUpdate } from "../../../../../hooks/employee/salary/debt/useDebtUpdate";
import { Debit } from "../../../../../../types/employee/salary/debit/list";

type FormValues = {
  aylik_ucret: string;
  odeme_sekli: string;
  maas_sayisi: number;
  baslangic_tarihi: string;
};

export default function PersonelSalaryDebtCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedDebt?: Debit };
  };

  const personelId = state?.personelId;
  const selectedDebt = state?.selectedDebt;

  const {
    addNewDebt,
    loading: addLoading,
    error: addError,
  } = useDebtAdd();

  const {
    updateExistingDebt,
    loading: updateLoading,
    error: updateError,
  } = useDebtUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    aylik_ucret: "",
    odeme_sekli: "",
    maas_sayisi: 1,
    baslangic_tarihi: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedDebt) {
      setInitialValues({
        aylik_ucret: selectedDebt.aylik_ucret ?? "",
        odeme_sekli: selectedDebt.odeme_sekli ?? "",
        maas_sayisi: selectedDebt.maas_sayisi ?? 1,
        baslangic_tarihi: selectedDebt.baslangic_tarihi?.split("T")[0] ?? "",
      });
    }
  }, [mode, selectedDebt]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "aylik_ucret",
      label: "Aylık Ücret",
      type: "currency",
      required: true,
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
      name: "maas_sayisi",
      label: "Maaş Sayısı",
      type: "number",
      required: true,
      min: 1,
    },
    {
      name: "baslangic_tarihi",
      label: "Başlangıç Tarihi",
      type: "date",
      required: true,
    },
  ];

  async function handleSubmit(values: FormValues) {
    if (!personelId && mode === "add") return;

    if (mode === "add") {
      await addNewDebt({
        personel_id: personelId!,
        aylik_ucret: values.aylik_ucret,
        odeme_sekli: values.odeme_sekli,
        maas_sayisi: Number(values.maas_sayisi),
        baslangic_tarihi: values.baslangic_tarihi,
      });
    } else if (id) {
      await updateExistingDebt({
        debitId: Number(id),
        payload: {
          aylik_ucret: values.aylik_ucret,
          odeme_sekli: values.odeme_sekli,
          maas_sayisi: Number(values.maas_sayisi),
          baslangic_tarihi: values.baslangic_tarihi,
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
      title={mode === "add" ? "Maaş Borç Ekle" : "Maaş Borç Güncelle"}
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
