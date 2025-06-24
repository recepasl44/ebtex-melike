// src/components/common/personel/personelDetail/tabs/kesinti/crud.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useInterruptionAdd } from "../../../../../hooks/employee/interruption/useInterruptionAdd";
import { useInterruptionUpdate } from "../../../../../hooks/employee/interruption/useInterruptionUpdate";
import { fetchInterruptionList } from "../../../../../../slices/employee/interruption/list/thunk";
import { AppDispatch } from "../../../../../../store";
import { Interruption } from "../../../../../../types/employee/interruption/list";

type FormValues = {
  donem: string;
  miktar: string;
  tarih: string;
  aciklama: string;
};

export default function PersonelKesintiCrud() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const { state } = useLocation() as { state?: { personelId?: number; selectedKesinti?: Interruption } };
  const [searchParams] = useSearchParams();
  const personelIdParam = searchParams.get("personelId");
  const personelId = state?.personelId ?? (personelIdParam ? Number(personelIdParam) : undefined);
  const selectedKesinti = state?.selectedKesinti;

  const { addNewInterruption, loading: addLoading, error: addError } = useInterruptionAdd();
  const { updateExistingInterruption, loading: updateLoading, error: updateError } = useInterruptionUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    donem: "",
    miktar: "",
    tarih: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedKesinti) {
      setInitialValues({
        donem: selectedKesinti.vade || "",
        miktar: selectedKesinti.miktar,
        tarih: selectedKesinti.created_at || "",
        aciklama: selectedKesinti.aciklama || "",
      });
    }
  }, [mode, selectedKesinti]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "donem",
      label: "Dönem",
      type: "date",
      required: true,
    },
    {
      name: "miktar",
      label: "Kesinti Tutarı (₺)",
      type: "currency",
      required: true,
    },
    {
      name: "tarih",
      label: "Tarih",
      type: "date",
      required: true,
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
        vade: vals.donem,
        miktar: vals.miktar,
        odeme_sekli: "",
        aciklama: vals.aciklama,
      });
      dispatch(fetchInterruptionList({ personel_id: personelId }));
    } else if (id) {
      await updateExistingInterruption({
        interruptionId: Number(id),
        payload: {
          vade: vals.donem,
          miktar: vals.miktar,
          odeme_sekli: "",
          aciklama: vals.aciklama,
        },
      });
      dispatch(fetchInterruptionList({ personel_id: personelId }));
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

export interface PaymentValues {
  odeme_sekli: string;
  alinan: string;
  banka_hesap_adi: string;
}

export function KesintiPaymentModal({
  show,
  onClose,
  onSubmit,
}: {
  show: boolean;
  onClose: () => void;
  onSubmit?: (vals: PaymentValues) => void;
}) {
  const initial: PaymentValues = {
    odeme_sekli: "",
    alinan: "",
    banka_hesap_adi: "",
  };

  const fields: FieldDefinition[] = [
    {
      name: "odeme_sekli",
      label: "Ödeme Şekli",
      type: "select",
      options: [
        { label: "Nakit", value: "Nakit" },
        { label: "Banka", value: "Banka" },
      ],
      required: true,
    },
    { name: "alinan", label: "Alınan Tutar", type: "currency", required: true },
    { name: "banka_hesap_adi", label: "Banka Hesap Adı", type: "text" },
  ];

  function handleSubmit(values: PaymentValues) {
    onSubmit?.(values);
    onClose();
  }

  return (
    <ReusableModalForm<PaymentValues>
      show={show}
      onClose={onClose}
      title="Ödeme Al"
      fields={fields}
      initialValues={initial}
      onSubmit={handleSubmit}
      confirmButtonLabel="Kaydet"
      mode="double"
    />
  );
}
