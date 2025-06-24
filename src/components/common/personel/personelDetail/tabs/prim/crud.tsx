// src/components/common/personel/personelDetail/tabs/kesinti/crud.tsx
import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
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

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedKesinti?: Interruption };
  };
  const [searchParams] = useSearchParams();
  const rawParam = searchParams.get("personel_id");
  const paramId = rawParam ? Number(rawParam) : undefined;
  const personelId =
    state?.personelId ??
    (paramId && paramId > 0 ? paramId : undefined);

  const selectedKesinti = state?.selectedKesinti;

  const {
    addNewInterruption,
    loading: addLoading,
    error: addError,
  } = useInterruptionAdd();
  const {
    updateExistingInterruption,
    loading: updateLoading,
    error: updateError,
  } = useInterruptionUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    donem: "",
    miktar: "",
    tarih: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedKesinti) {
      setInitialValues({
        donem: selectedKesinti.vade,
        miktar: selectedKesinti.miktar,
        tarih: selectedKesinti.created_at,
        aciklama: selectedKesinti.aciklama,
      });
    }
  }, [mode, selectedKesinti]);

  // Tüm alanlar ekle modunda opsiyonel, güncelleme modunda zorunlu
  const getFields = (): FieldDefinition[] => [
    {
      name: "donem",
      label: "Dönem",
      type: "date",
      required: mode === "update",
    },
    {
      name: "miktar",
      label: "Kesinti Tutarı (₺)",
      type: "currency",
      required: mode === "update",
    },
    {
      name: "tarih",
      label: "Tarih",
      type: "date",
      required: mode === "update",
    },
    {
      name: "aciklama",
      label: "Açıklama",
      type: "textarea",
      required: false,
    },
  ];

  async function handleSubmit(vals: FormValues) {
    if (!personelId) {
      console.warn("‼ Geçerli bir personel_id bulunamadı, işlem iptal edildi");
      return;
    }

    const payload = {
      personel_id: personelId,
      vade: vals.donem,
      miktar: vals.miktar,
      odeme_sekli: "",  // gereken yerde ekleyebilirsiniz
      aciklama: vals.aciklama,
    };

    if (mode === "add") {
      await addNewInterruption(payload);
    } else {
      await updateExistingInterruption({
        interruptionId: Number(id),
        payload,
      });
    }

    dispatch(fetchInterruptionList({ personel_id: personelId }));
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
