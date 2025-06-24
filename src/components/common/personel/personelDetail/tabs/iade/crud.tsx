
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useRefundAdd } from "../../../../../hooks/employee/refund/useRefundAdd";
import { useRefundUpdate } from "../../../../../hooks/employee/refund/useRefundUpdate";
import { fetchRefundList } from "../../../../../../slices/employee/refund/list/thunk";
import { AppDispatch } from "../../../../../../store";
import { Refund } from "../../../../../../types/employee/refund/list";

type FormValues = {
  tarih: string;
  odeme_sekli: string;
  miktar: string;
  banka_hesap_adi: string;
  aciklama: string;
};

export default function PersonelIadeCrud() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const { state } = useLocation() as { state?: { personelId?: number; selectedIade?: Refund } };
  const [searchParams] = useSearchParams();
  const personelIdParam = searchParams.get("personelId");
  const personelId = state?.personelId ?? (personelIdParam ? Number(personelIdParam) : undefined);
  const selectedIade = state?.selectedIade;

  const { addNewRefund, loading: addLoading, error: addError } = useRefundAdd();
  const { updateExistingRefund, loading: updateLoading, error: updateError } = useRefundUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    tarih: "",
    odeme_sekli: "",
    miktar: "",
    banka_hesap_adi: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedIade) {
      setInitialValues({
        tarih: selectedIade.tarih || "",
        odeme_sekli: selectedIade.odeme_sekli || "",
        miktar: selectedIade.miktar,
        banka_hesap_adi: selectedIade.banka_hesap_adi || "",
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
      label: "Alınan Tutar (₺)",
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

  async function handleSubmit(vals: FormValues) {
    if (!personelId) {
      alert("Personel ID bulunamadı");
      return;
    }

    try {
      if (mode === "add") {
        await addNewRefund({
          personel_id: personelId,
          tarih: vals.tarih,
          odeme_sekli: vals.odeme_sekli,
          miktar: vals.miktar,
          banka_hesap_adi: vals.banka_hesap_adi,
          aciklama: vals.aciklama,
        });
        dispatch(fetchRefundList({ personel_id: personelId }));
      } else if (id) {
        await updateExistingRefund({
          refundId: Number(id),
          payload: {
            tarih: vals.tarih,
            odeme_sekli: vals.odeme_sekli,
            miktar: vals.miktar,
            banka_hesap_adi: vals.banka_hesap_adi,
            aciklama: vals.aciklama,
          },
        });
        dispatch(fetchRefundList({ personel_id: personelId }));
      }

      navigate(-1);
    } catch (error) {
      console.error("İade formu kaydetme hatası:", error);
    }
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
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="İptal"
      isLoading={isLoading}
      error={error || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose
      mode="double"
    />
  );
}