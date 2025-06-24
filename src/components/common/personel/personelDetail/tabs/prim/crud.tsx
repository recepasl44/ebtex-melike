import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { usePrimlerAdd } from "../../../../../hooks/employee/prim/usePrimlerAdd";
import { usePrimlerUpdate } from "../../../../../hooks/employee/prim/usePrimlerUpdate";
import { Primler } from "../../../../../../types/employee/primler/list";

type FormValues = {
  donem: string;        // sayısal dönem / açıklama
  prim_tutari: string;  // para miktarı
  tarih: string;        // vade tarihi
  aciklama: string;
};

export default function PersonelPrimlerCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  // State üzerinden veya ?personel_id=123 / ?personelId=123 query'sinden al
  const { state } = useLocation() as {
    state?: { personelId?: number; selectedPrimler?: Primler };
  };
  const [searchParams] = useSearchParams();
  const personelIdParam =
    searchParams.get("personel_id") ?? searchParams.get("personelId");
  const personelId =
    state?.personelId ??
    (personelIdParam ? Number(personelIdParam) : undefined);

  const selectedPrimler = state?.selectedPrimler;

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
    prim_tutari: "",
    tarih: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedPrimler) {
      setInitialValues({
        donem:
          (selectedPrimler as any).donem ||
          selectedPrimler.vade.toString() ||
          "",
        prim_tutari:
          (selectedPrimler as any).prim_tutari ||
          selectedPrimler.miktar.toString() ||
          "",
        tarih: (selectedPrimler as any).tarih || "",
        aciklama: selectedPrimler.aciklama || "",
      });
    }
  }, [mode, selectedPrimler]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "donem",
      label: "Dönem",
      type: "number",
      required: true,
    },
    {
      name: "prim_tutari",
      label: "Prim Tutarı (₺)",
      type: "currency",
      required: true,
    },
    {
      name: "tarih",
      label: "Vade Tarihi",
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
    console.log("▶ handleSubmit:", { vals, personelId, mode });

    // personelId yoksa veya geçersizse işleme devam etme
    if (!personelId || personelId <= 0) {
      console.warn("‼ personelId bulunamadı veya geçersiz, işlem iptal edildi");
      return;
    }

    // API’ye gönderilecek payload
    const payload: any = {
      personel_id: personelId,
      vade: vals.tarih,             // artık tarih stringi
      miktar: vals.prim_tutari,
      aciklama: vals.aciklama,
    };

    if (mode === "add") {
      await addNewPrimler(payload);
    } else if (id) {
      await updateExistingPrimler({
        primlerId: Number(id),
        payload,
      } as any);
    }

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
