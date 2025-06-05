import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { usePrimlerAdd } from "../../../../../hooks/employee/prim/usePrimlerAdd";
import { usePrimlerUpdate } from "../../../../../hooks/employee/prim/usePrimlerUpdate";
import { Primler } from "../../../../../../types/employee/primler/list";

type FormValues = {
  vade: string;
  miktar: string;
  aciklama: string;
};

export default function PersonelPrimlerCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedPrimler?: Primler };
  };
  const personelId = state?.personelId;
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
    vade: "",
    miktar: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedPrimler) {
      setInitialValues({
        vade: selectedPrimler.vade || "",
        miktar: selectedPrimler.miktar,
        aciklama: selectedPrimler.aciklama || "",
      });
    }
  }, [mode, selectedPrimler]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "vade",
      label: "Vade",
      type: "date",
      required: true,
    },
    {
      name: "miktar",
      label: "Prim Miktarı",
      type: "currency",
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
        vade: vals.vade,
        miktar: vals.miktar,
        aciklama: vals.aciklama,
      });
    } else if (id) {
      await updateExistingPrimler({
        primlerId: Number(id),
        payload: {
          vade: vals.vade,
          miktar: vals.miktar,
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
      show={true}
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
