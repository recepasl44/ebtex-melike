import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { usePaymentAdd } from "../../../../../hooks/employee/salary/payment/usePaymentAdd";
import { usePaymentUpdate } from "../../../../../hooks/employee/salary/payment/usePaymentUpdate";
import { useDebtShow } from "../../../../../hooks/employee/salary/debt/useDebtIndex";
import { Payment } from "../../../../../../types/employee/salary/payment/list";

type FormValues = {
  borc_id: number | string;
  miktar: string;
  odeme_sekli: string;
  aciklama: string;
};

export default function PersonelSalaryPaymentCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedPayment?: Payment };
  };
  const personelId = state?.personelId;
  const selectedPayment = state?.selectedPayment;

  const { debt: debts, getDebt } = useDebtShow(); // to fetch borçlar
console.log(debts,"fsdfcsdfs")
  const { addNewPayment, loading: addLoading, error: addError } = usePaymentAdd();
  const { updateExistingPayment, loading: updateLoading, error: updateError } = usePaymentUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    borc_id: "",
    miktar: "",
    odeme_sekli: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedPayment) {
      setInitialValues({
        borc_id: selectedPayment.borc_id ?? "",
        miktar: selectedPayment.miktar ?? "",
        odeme_sekli: selectedPayment.odeme_sekli ?? "",
        aciklama: selectedPayment.aciklama ?? "",
      });
    }
  }, [mode, selectedPayment]);

  useEffect(() => {
    if (personelId) {
      getDebt(personelId);
    }
  }, [personelId]);
  const debtList = Array.isArray(debts) ? debts : debts ? [debts] : [];

  console.log(
    "sonuç",
 
  );

  const getFields = (): FieldDefinition[] => [
    {
      name: "borc_id",
      label: "Bağlı Borç",
      type: "select",
      required: true,
      options:
      debtList.map((d) => ({
        label: `${d.aylik_ucret} ₺ | ${d.baslangic_tarihi}`,
        value: d.id,
      }))
    },
    {
      name: "miktar",
      label: "Miktar",
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
      name: "aciklama",
      label: "Açıklama",
      type: "textarea",
    },
  ];

  async function handleSubmit(values: FormValues) {
    if (!personelId && mode === "add") return;

    const payload = {
      borc_id: Number(values.borc_id),
      miktar: Number(values.miktar),
      odeme_sekli: values.odeme_sekli,
      aciklama: values.aciklama,
    };

    if (mode === "add") {
      await addNewPayment({ personel_id: personelId!, ...payload });
    } else if (id) {
      await updateExistingPayment({
        paymentId: Number(id),
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
      title={mode === "add" ? "Maaş Ödemesi Ekle" : "Maaş Ödemesi Güncelle"}
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
