import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { usePrimlerAdd } from "../../../../../hooks/employee/prim/usePrimlerAdd";
import { usePrimlerUpdate } from "../../../../../hooks/employee/prim/usePrimlerUpdate";
import { fetchPrimlerList } from "../../../../../../slices/employee/primler/list/thunk";
import { AppDispatch } from "../../../../../../store";
import { Primler } from "../../../../../../types/employee/primler/list";

type FormValues = {
  donem: string;
  miktar: string;
  tarih: string;
  odeme_sekli: string;
  aciklama: string;
};

export default function PersonelPrimCrud() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedPrim?: Primler };
  };
  const [searchParams] = useSearchParams();
  const rawParam = searchParams.get("personel_id");
  const paramId = rawParam ? Number(rawParam) : undefined;
  const personelId =
    state?.personelId ??
    (paramId && paramId > 0 ? paramId : undefined);

  const selectedPrim = state?.selectedPrim;

  const {
    addNewPrimler,
    loading: addLoading,
    error: addError,
  } = usePrimlerAdd();
  const {
    updateExistingPrimler,
    loading: updateLoading,
    error: updateError,
  } = usePrimlerUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    donem: "",
    miktar: "",
    tarih: "",
    odeme_sekli: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedPrim) {
      setInitialValues({
        donem: selectedPrim.vade,
        miktar: selectedPrim.miktar,
        tarih: selectedPrim.created_at,
        aciklama: selectedPrim.aciklama,
        odeme_sekli: (selectedPrim as any).odeme_sekli || "",
      });
    }
  }, [mode, selectedPrim]);

  // Tüm alanlar ekle modunda opsiyonel, güncelleme modunda zorunlu
  const getFields = (): FieldDefinition[] => [
    {
      name: "donem",
      label: "Dönem",
      type: "date",
      required: mode === "update",
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
      label: "Prim Miktarı (₺)",
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
      tarih: vals.tarih,
      odeme_sekli: vals.odeme_sekli,
      aciklama: vals.aciklama,
    };

    if (mode === "add") {
      await addNewPrimler(payload);
    } else {
      await updateExistingPrimler({
        primlerId: Number(id),
        payload,
      });
    }

    dispatch(fetchPrimlerList({ personel_id: personelId }));
    navigate(-1);
  }

  const isLoading = addLoading || updateLoading;
  const error = addError || updateError;

  return (
    <ReusableModalForm<FormValues>
      show
      title={mode === "add" ? "Prim Ekle" : "Prim Güncelle"}
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
