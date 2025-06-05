import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../ReusableModalForm";
import { usePersonelAdd } from "../../hooks/employee/personel/useAdd";
import { usePersonelUpdate } from "../../hooks/employee/personel/useUpdate";
import { usePersonelShow } from "../../hooks/employee/personel/useDetail";
import { PersonelListStatus } from "../../../enums/employee/personel/list";
import { PersonelAddPayload } from "../../../types/employee/personel/add";
import { PersonelUpdatePayload } from "../../../types/employee/personel/update";
import { calculateFreeMonths } from "../../../utils/calculatefreemounth";

export default function PersonelCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  const [initialValues, setInitialValues] = useState<PersonelAddPayload>({
    ad: "",
    soyad: "",
    tc_kimlik_no: "",
    telefon: "",
    email: "",
    adres: "",
    pozisyon: "",
    dogum_tarihi: "",
    mesleki_yas: "",
    ikametgah_adresi: "",
    gorev: "",
    brans: "",
    profil_foto: "",
    works_for: "",
    base_salary: "",
    aggrements_date: { startDate: "", endDate: "" },
    not_paid_date: [],
  });

  // Hooks: add / update / detail
  const { addNewPersonel, status: addStatus, error: addError } = usePersonelAdd();
  const {
    updateExistingPersonel,
    status: updateStatus,
    error: updateError,
  } = usePersonelUpdate();
  const {
    personel,
    status: showStatus,
    error: showError,
    getPersonel,
  } = usePersonelShow();
  function handleAggrementsChange(
    range: { startDate: string; endDate: string },
    formik: any
  ) {
    formik.setFieldValue("aggrements_date", range);

    if (range.startDate && range.endDate) {
      const months = calculateFreeMonths(
        new Date(range.startDate),
        new Date(range.endDate)
      );
      setAvailableMonths(months);
      /* Aralık dışında kalmış eski seçimleri temizle */
      formik.setFieldValue(
        "not_paid_date",
        (formik.values.not_paid_date || []).filter((m: string) =>
          months.includes(m)
        )
      );
    } else {
      setAvailableMonths([]);
      formik.setFieldValue("not_paid_date", []);
    }
  }
  // useEffect => eğer update mod ise personel detail'i çek
  useEffect(() => {
    if (mode === "update" && id) {
      const personelId = parseInt(id, 10);
      if (personelId) {
        getPersonel(personelId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id]);

  // personel detail -> initialValues doldur
  useEffect(() => {
    if (mode === "update" && personel) {
      // personel verisinden state doldurma
      setInitialValues({
        ad: personel.ad,
        soyad: personel.soyad,
        tc_kimlik_no: personel.tc_kimlik_no,
        telefon: personel.telefon,
        email: personel.email,
        adres: personel.adres,
        pozisyon: personel.pozisyon,
        dogum_tarihi: personel.dogum_tarihi
          ? personel.dogum_tarihi.split("T")[0]
          : "",
        mesleki_yas: personel.mesleki_yas,
        ikametgah_adresi: personel.ikametgah_adresi,
        gorev: personel.gorev,
        brans: personel.brans,
        profil_foto: personel.profil_foto,
        works_for: personel.works_for,
        base_salary: personel.base_salary,
        aggrements_date: personel.aggrements_date,
        not_paid_date: personel.not_paid_date,
      });
    }
  }, [mode, personel]);

  // Form alanları
  const getFields = (): FieldDefinition[] => {
    return [
      {
        name: "ad",
        label: "Ad",
        type: "text",
        required: true,
      },
      {
        name: "soyad",
        label: "Soyad",
        type: "text",
        required: true,
      },
      {
        name: "tc_kimlik_no",
        label: "T.C.",
        type: "text",
        required: true,
      },
      {
        name: "telefon",
        label: "Telefon",
        type: "phone",
        required: true,
      },
      {
        name: "email",
        label: "E-Posta",
        type: "email",
        required: true,
      },
      {
        name: "adres",
        label: "Adres",
        type: "text",
        required: true,
      },
      {
        name: "dogum_tarihi",
        label: "Doğum Tarihi",
        type: "date",
        required: true,
      },
      {
        name: "mesleki_yas",
        label: "Mesleki Yaş",
        type: "number",
      },
      {
        name: "ikametgah_adresi",
        label: "İkametgah",
        type: "text",
      },
      {
        name: "gorev",
        label: "Görev",
        type: "text",
      },
      {
        name: "brans",
        label: "Branş",
        type: "text",
      },
      {
        name: "profil_foto",
        label: "Foto (base64)",
        type: "file",
      },
      {
        name: "works_for",
        label: "Çalıştığı Kurumlar",
        type: "text",
      },
      {
        name: "base_salary",
        label: "Maaş",
        type: "currency",

      },
      {
        name: "aggrements_date",
        label: "Sözleşme Tarihi (range)",
        type: "doubledate",
        onChange: (range, formik) => handleAggrementsChange(range, formik),
      },
      {
        name: "not_paid_date",
        label: "Ücretsiz Aylar",
        type: "multiselect",
        options: availableMonths.map((m) => ({ value: m, label: m })),  // <-- artık scope’ta
      },

    ];
  };

  // handleSubmit
  async function handleSubmit(values: any) {
    try {
      if (mode === "add") {
        // add
        await addNewPersonel(values as PersonelAddPayload);
      } else {
        // update
        if (!id) return;
        const payload: PersonelUpdatePayload = {
          personelId: Number(id),
          payload: {
            ad: values.ad,
            soyad: values.soyad,
            tc_kimlik_no: values.tc_kimlik_no,
            telefon: values.telefon,
            aggrements_date: values.aggrements_date,
            email: values.email,
            adres: values.adres,
            pozisyon: values.pozisyon || "",
            dogum_tarihi: values.dogum_tarihi || "",
            aktif: values.aktif || 0,
          },
        };
        await updateExistingPersonel(payload);
      }
      navigate(-1);
    } catch (error) {
      console.error("PersonelCrud handleSubmit error:", error);
    }
  }

  // loading & error
  const loading =
    (mode === "add" && addStatus === PersonelListStatus.LOADING) ||
    (mode === "update" &&
      (updateStatus === PersonelListStatus.LOADING ||
        showStatus === PersonelListStatus.LOADING));
  const err =
    mode === "add"
      ? addError
      : mode === "update"
        ? updateError || showError
        : null;

  return (
    <ReusableModalForm
      show={true} // Tek sayfa moddaysanız show={true} verin, ya da tam sayfa
      title={mode === "add" ? "Personel Ekle" : "Personel Güncelle"}
      fields={getFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      confirmButtonLabel={mode === "add" ? "Ekle" : "Güncelle"}
      cancelButtonLabel="Vazgeç"
      isLoading={loading}
      error={err || null}
      onClose={() => navigate(-1)}
      autoGoBackOnModalClose={true}
      mode="single" // ReusableModalForm "single" => tek kolon
    />
  );
}
