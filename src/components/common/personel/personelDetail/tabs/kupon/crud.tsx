
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReusableModalForm, { FieldDefinition } from "../../../../ReusableModalForm";
import { useCouponPriceShow } from "../../../../../hooks/employee/coupon_price/useCouponPriceShow";
import { useCouponPriceAdd } from "../../../../../hooks/employee/coupon_price/useCouponPriceAdd";
import { useCouponPriceUpdate } from "../../../../../hooks/employee/coupon_price/useCouponPriceUpdate";
import { CouponPrice } from "../../../../../../types/employee/coupon_price/list";

type FormValues = {
  tarih: string;
  urun_adi: string;
  urun_turu: string;
  satis_ucreti: string;
  kupon_yuzdesi: string;
};

export default function PersonelCouponCrud() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mode = id ? "update" : "add";

  const { state } = useLocation() as {
    state?: { personelId?: number; selectedCoupon?: CouponPrice };
  };
  const personelId = state?.personelId;
  const selected = state?.selectedCoupon;

  const {
    couponPrice,
    getCouponPrice,
    loading: detailLoading,
    error: detailError,
  } = useCouponPriceShow();
  const {
    addNewCouponPrice,
    loading: addLoading,
    error: addError,
  } = useCouponPriceAdd();
  const {
    updateExistingCouponPrice,
    loading: updateLoading,
    error: updateError,
  } = useCouponPriceUpdate();

  const [initialValues, setInitialValues] = useState<FormValues>({
    tarih: "",
    urun_adi: "",
    urun_turu: "",
    satis_ucreti: "0.00",
    kupon_yuzdesi: "0",
  });

  // fetch detail on update
  useEffect(() => {
    if (mode === "update" && id) {
      getCouponPrice(Number(id));
    }
  }, [mode, id, getCouponPrice]);

  // populate form when detail arrives
  useEffect(() => {
    const src = selected || couponPrice;
    if (mode === "update" && src) {
      setInitialValues({
        tarih: src.tarih || "",
        urun_adi: src.urun_adi || "",
        urun_turu: src.urun_turu || "",
        satis_ucreti: src.satis_ucreti || "0.00",
        kupon_yuzdesi: String(src.kupon_yuzdesi ?? 0),
      });
    }
  }, [mode, selected, couponPrice]);

  const getFields = (): FieldDefinition[] => [
    { name: "tarih", label: "Tarih", type: "date", required: true },
    { name: "urun_adi", label: "Ürün Adı", type: "text", required: true },
    { name: "urun_turu", label: "Ürün Türü", type: "text" },
    {
      name: "satis_ucreti",
      label: "Satış Ücreti",
      type: "currency",
      required: true,
    },
    {
      name: "kupon_yuzdesi",
      label: "Kupon %",
      type: "number",
      required: true,
    },
  ];

  async function handleSubmit(vals: FormValues) {
    if (!personelId) return;

    const payload = {
      personel_id: personelId,
      tarih: vals.tarih,
      urun_adi: vals.urun_adi,
      urun_turu: vals.urun_turu,
      satis_ucreti: vals.satis_ucreti,
      kupon_yuzdesi: Number(vals.kupon_yuzdesi),
    };

    if (mode === "add") {
      await addNewCouponPrice(payload as any);
    } else if (id) {
      await updateExistingCouponPrice({
        couponPriceId: Number(id),
        payload,
      } as any);
    }

    navigate(-1);
  }

  const isLoading = detailLoading || addLoading || updateLoading;
  const error = detailError || addError || updateError;

  return (
    <ReusableModalForm<FormValues>
      show={true}
      title={mode === "add" ? "Kupon Ekle" : "Kupon Güncelle"}
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
