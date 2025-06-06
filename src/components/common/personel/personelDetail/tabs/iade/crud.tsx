
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useRefundAdd } from "../../../../../hooks/employee/refund/useRefundAdd";
import { useRefundUpdate } from "../../../../../hooks/employee/refund/useRefundUpdate";
import { Refund } from "../../../../../../types/employee/refund/list";

type FormValues = {
  tarih: string;
  miktar: string;
  odeme_sekli: string;
  aciklama: string;
};

export default function PersonelIadeCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const { state } = useLocation() as { state?: { personelId?: number; selectedIade?: Refund } };
  const personelId = state?.personelId;
  const selectedIade = state?.selectedIade;

  const { addNewRefund, loading: addLoading, error: addError } = useRefundAdd();
  const { updateExistingRefund, loading: updateLoading, error: updateError } = useRefundUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    tarih: "",
    miktar: "",
    odeme_sekli: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedIade) {
      setInitialValues({
        tarih: selectedIade.tarih || "",
        miktar: selectedIade.miktar,
        odeme_sekli: selectedIade.odeme_sekli || "",
        aciklama: selectedIade.aciklama || "",
      });
    }
  }, [mode, selectedIade]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "tarih",
      label: "Tarih",
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
      await addNewRefund({
        personel_id: personelId,
        tarih: vals.tarih,
        miktar: vals.miktar,
        odeme_sekli: vals.odeme_sekli,
        aciklama: vals.aciklama,
      });
    } else if (id) {
      await updateExistingRefund({
        refundId: Number(id),
        payload: {
          tarih: vals.tarih,
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
      title={mode === "add" ? "İade Ekle" : "İade Güncelle"}
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
