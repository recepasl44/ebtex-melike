import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation, useSearchParams } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { usePrimlerAdd } from "../../../../../hooks/employee/prim/usePrimlerAdd";
import { usePrimlerUpdate } from "../../../../../hooks/employee/prim/usePrimlerUpdate";
import { fetchPrimlerList } from "../../../../../../slices/employee/primler/list/thunk";
import { AppDispatch } from "../../../../../../store";
import { Primler } from "../../../../../../types/employee/primler/list";

type FormValues = {
  donem: string;
  prim_tutari: string;
  tarih: string;
  aciklama: string;
};

export default function PersonelPrimlerCrud() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedPrimler?: Primler };
  };
  const [searchParams] = useSearchParams();
  const personelIdParam = searchParams.get("personelId");
  const personelId = state?.personelId ?? (personelIdParam ? Number(personelIdParam) : undefined);
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
        donem: (selectedPrimler as any).donem || selectedPrimler.vade || "",
        prim_tutari: (selectedPrimler as any).prim_tutari || selectedPrimler.miktar,
        tarih: (selectedPrimler as any).tarih || "",
        aciklama: selectedPrimler.aciklama || "",
      });
    }
  }, [mode, selectedPrimler]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "donem",
      label: "Dönem ",
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
      await addNewPrimler({
        personel_id: personelId,
        vade: vals.donem,
        miktar: vals.prim_tutari,
        tarih: vals.tarih,
        aciklama: vals.aciklama,
      } as any);
      dispatch(fetchPrimlerList({ personel_id: personelId }));
    } else if (id) {
      await updateExistingPrimler({
        primlerId: Number(id),
        payload: {
          vade: vals.donem,
          miktar: vals.prim_tutari,
          tarih: vals.tarih,
          aciklama: vals.aciklama,
        } as any,
      } as any);
      dispatch(fetchPrimlerList({ personel_id: personelId }));
    }

    navigate(-1);
  }

  const isLoading = addLoading || updateLoading;
  const error = addError || updateError;

  return (
    <ReusableModalForm<FormValues>
      show={true}
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
