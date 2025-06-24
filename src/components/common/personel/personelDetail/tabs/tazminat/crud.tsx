import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useCompensationAdd } from "../../../../../hooks/employee/compensation/useAdd";
import { useCompensationUpdate } from "../../../../../hooks/employee/compensation/useUpdate";
import { fetchCompensationList } from "../../../../../../slices/employee/compensation/list/thunk";
import { AppDispatch } from "../../../../../../store";
import { Compensation } from "../../../../../../types/employee/compensation/list";

type FormValues = {
  tarih: string;
  tazminat_turu: string;
  odeme_sekli: string;
  miktar: string;
  banka_hesap_adi: string;
  aciklama: string;
};

export default function PersonelCompensationCrud() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedCompensation?: Compensation };
  };
  const [searchParams] = useSearchParams();
  const personelIdParam = searchParams.get("personelId");
  const personelId = state?.personelId ?? (personelIdParam ? Number(personelIdParam) : undefined);
  const selectedCompensation = state?.selectedCompensation;

  const {
    addNewCompensation,
    loading: addLoading,
    error: addError,
  } = useCompensationAdd();

  const {
    updateExistingCompensation,
    loading: updateLoading,
    error: updateError,
  } = useCompensationUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    tarih: "",
    tazminat_turu: "",
    odeme_sekli: "",
    miktar: "",
    banka_hesap_adi: "",
    aciklama: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedCompensation) {
      setInitialValues({
        tarih: (selectedCompensation as any).tarih || "",
        tazminat_turu: selectedCompensation.tazminat_turu || "",
        odeme_sekli: selectedCompensation.odeme_sekli || "",
        miktar: selectedCompensation.miktar || "",
        banka_hesap_adi: selectedCompensation.banka_hesap_adi || "",
        aciklama: selectedCompensation.aciklama || "",
      });
    }
  }, [mode, selectedCompensation]);

  const getFields = (): FieldDefinition[] => [
    {
      name: "tarih",
      label: "Tarih",
      type: "date",
      required: true,
    },
    {
      name: "tazminat_turu",
      label: "Tazminat Türü",
      type: "select",
      required: true,
      options: [
        { label: "Kıdem Tazminatı", value: "Kıdem Tazminatı" },
        { label: "İhbar Tazminatı", value: "İhbar Tazminatı" },
        { label: "Diğer Tazminat", value: "Diğer Tazminat" },
      ],
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
      label: "Miktar",
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

  async function handleSubmit(values: FormValues) {
    if (!personelId && mode === "add") return;

    if (mode === "add") {
      await addNewCompensation({
        personel_id: personelId!,
        tarih: values.tarih,
        tazminat_turu: values.tazminat_turu,
        odeme_sekli: values.odeme_sekli,
        miktar: values.miktar,
        banka_hesap_adi: values.banka_hesap_adi,
        aciklama: values.aciklama,
      });
      dispatch(fetchCompensationList({ personel_id: personelId! }));
    } else if (id) {
      await updateExistingCompensation({
        compensationId: Number(id),
        payload: {
          tarih: values.tarih,
          tazminat_turu: values.tazminat_turu,
          odeme_sekli: values.odeme_sekli,
          miktar: values.miktar,
          banka_hesap_adi: values.banka_hesap_adi,
          aciklama: values.aciklama,
        },
      });
      dispatch(fetchCompensationList({ personel_id: personelId! }));
    }

    navigate(-1);
  }

  const isLoading = addLoading || updateLoading;
  const error = addError || updateError;

  return (
    <ReusableModalForm<FormValues>
      show={true}
      title={mode === "add" ? "Tazminat Ekle" : "Tazminat Güncelle"}
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
